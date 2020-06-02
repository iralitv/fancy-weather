import { getUserLocation } from './location';
import { writeCoords } from './geolocation';
import getWeather from './weatherInfo';
import clock from './clock';
import map from './map';
import { convertTemp } from './convertTemp';
import changeBackground from './background';

let clockInterval;

// eslint-disable-next-line consistent-return
const searchWeather = async () => {
  try {
    const lang = localStorage.getItem('language') || 'en';
    const coords = await getUserLocation();
    writeCoords(coords);
    const weather = await getWeather(coords, lang);
    map(coords.reverse());
    if (weather.timezone) {
      clockInterval = setInterval(() => clock(`${weather.timezone}`), 1000);
    }

    if (localStorage.getItem('temp') === 'F') {
      convertTemp();
    }

    const background = changeBackground(localStorage.getItem('city'));

    Promise.all([coords, weather, background])
      .then(() => {
        document.querySelector('.forecast').classList.remove('loading');
        document.querySelector('.forecast__notification').textContent = '';
      })
      .catch((e) => e.message);
  } catch (e) {
    return e;
  }
};

const handleSearch = () => {
  const searchField = document.querySelector('.search__input');
  document.querySelector('.forecast').classList.add('loading');
  localStorage.setItem('city', searchField.value);
  clearInterval(clockInterval);

  searchWeather();
};

export { searchWeather, handleSearch };
