import weatherTemplate from './weatherTemplate';
import memoize from './memoize';

const getWeather = memoize(async (coords, lang) => {
  const proxyWall = 'https://cors-anywhere.herokuapp.com/';
  const API_KEY = '43ca44b17c4017837e555b7a2fddd02d';
  const weatherUrl = `${proxyWall}https://api.darksky.net/forecast/${API_KEY}/${coords}?lang=${lang}&units=si`;
  try {
    const responce = await fetch(weatherUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const data = await responce.json();

    if (data.code !== 400) {
      weatherTemplate(data);
    } else {
      document.querySelector('.forecast').innerHTML = `No results for "${localStorage.getItem('city')}"`;
    }

    return data;
  } catch (e) {
    return e;
  }
});

export default getWeather;
