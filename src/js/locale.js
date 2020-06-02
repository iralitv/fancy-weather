import { handleSearch } from './searchWeather';

const changeLocaleService = (function () {
  // eslint-disable-next-line consistent-return
  function parsingLocale(locale, lang) {
      if (!locale[lang]) return console.log("no found language");
      else changeText('locale', locale[lang]);

      function changeText(name, object, startIndex) {
        for (const key in object)
          if (Array.isArray(object[key]) && typeof object[key] != 'string' && typeof object[key][0] == 'string') getArrayText(key, object, name);
          else if (typeof object[key] == "object" ){
            if(isNaN(key)) changeText(name + "-" + key, object[key]);
            else changeText(name, object[key],key);
          }
          else getText(key, object, name, startIndex);
      }
      function getText(key, object, name, startIndex) {
        let elementKey = 0;
        if(startIndex) elementKey = startIndex;

        for ( ; elementKey < document.getElementsByClassName(name + "-" + key).length; elementKey++)
          if (!isNaN(elementKey)) document.getElementsByClassName(name + "-" + key)[elementKey].textContent = object[key];

      }
      function getArrayText(key, object, name, startIndex) {
        let elementKey = 0;
        if(startIndex) elementKey = startIndex;

        for ( ; elementKey < document.getElementsByClassName(name + "-" + key).length; elementKey++)
          if (!isNaN(elementKey)) document.getElementsByClassName(name + "-" + key)[elementKey].textContent = object[key][elementKey % object[key].length];
      }
  }

  function changeLocale(lang) {
    fetch('../src/localeData.json')
      .then((res) => res.json())
      .then((data) => parsingLocale(data, lang))
      .catch((e) => e.message);
  }

  return {
    changeLocale,
  };
}());

const changeLanguage = (event) => {
  const language = (event && event.target.value) || localStorage.getItem('language') || 'en';
  localStorage.setItem('language', language);

  changeLocaleService.changeLocale(language);
  handleSearch();
};

export default changeLanguage;
