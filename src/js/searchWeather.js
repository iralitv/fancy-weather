import { getUserLocation } from './location';
import { writeCoords } from './geolocation';
import getWeather from './weatherInfo';
import clock from './clock';
import map from './map';
import { convertTemp } from './convertTemp';
import changeBackground from './background';
import weatherTemplate from "./weatherTemplate";

let clockInterval;

// eslint-disable-next-line consistent-return
const searchWeather = async (lang = 'en') => {
  try {
    const coords = await getUserLocation();
    writeCoords(coords);
    const weatherData = await getWeather(coords, lang);
    weatherTemplate(weatherData);
    map(coords.reverse());
    if (weatherData.timezone) {
      clockInterval = setInterval(() => clock(`${weatherData.timezone}`), 1000);
    }

    if (localStorage.getItem('temp') === 'F') {
      convertTemp();
    }

    const background = changeBackground(localStorage.getItem('city'));

    Promise.all([coords, weatherData, background])
      .then(() => {
        document.querySelector('.forecast').classList.remove('loading');
        document.querySelector('.forecast__notification').textContent = '';
      })
      .catch((e) => e.message);
  } catch (e) {
    return e;
  }
};

const handleSearch = (lang = 'en') => {
  const searchField = document.querySelector('.search__input');
  document.querySelector('.forecast').classList.add('loading');
  localStorage.setItem('city', searchField.value);
  clearInterval(clockInterval);

  searchWeather(lang);
};

export { searchWeather, handleSearch };
