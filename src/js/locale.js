import { handleSearch } from './searchWeather';
import memoize from "./memoize";

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
    const url = 'https://raw.githubusercontent.com/iralitv/fancy-weather/master/src/localeData.json';
    fetch(url)
      .then((res) => res.json())
      .then((data) => parsingLocale(data, lang))
      .then()
      .catch((e) => e.message);
  }

  return {
    changeLocale,
  };
}());

const getTranslation = memoize(async (enWord, currentLang, prevLang) => {
  try {
    const API_KEY = 'trnsl.1.1.20200424T060744Z.2252b23703addec2.e0bbc25dbcd8eb6b4f823d9a15c8c99ee6e03aeb';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${enWord}&lang=${prevLang}-${currentLang}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.text;
  } catch (e) {
    return e;
  }
});

const changeLanguage = async (event) => {
  let prevLang = localStorage.getItem('language') || 'en';
  const currentLang = (event.target && event.target.value) || 'en';
  localStorage.setItem('language', currentLang);
  const cityName = document.querySelector('.forecast__city');

  const cityTranslate = await getTranslation(cityName.textContent, currentLang, prevLang);
  cityName.textContent = await cityTranslate.join(',');
  changeLocaleService.changeLocale(currentLang);
};

export default changeLanguage;
