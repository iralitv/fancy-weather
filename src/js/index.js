import '../sass/style.scss';
import { geoLocation, getUserLocation } from './location';
import map from './map';
import changeBackground from './background';
import { clock } from './time';
import getWeather from './weatherInfo';
import { chooseTemp, convertTemp } from './convertTemp';

const weatherSearch = document.querySelector('.search__form');
let clockInterval;

const init = async () => {
  try {
    const coords = await getUserLocation();
    geoLocation(coords);
    const weather = await getWeather(coords, 'en');
    if (weather.timezone) {
      clockInterval = setInterval(() => clock(`${weather.timezone}`), 1000);
    }
    map(coords.reverse());
    if (localStorage.getItem('temp') === 'F') {
      convertTemp();
    }
    const background = changeBackground(localStorage.getItem('city'));

    Promise.all([coords, weather, background])
      .then(() => {
        document.querySelector('.forecast').classList.remove('loading');
        document.querySelector('.forecast__notification').textContent = '';
      })
      .catch((e) => e.message());
  } catch (e) {
    return e;
  }
};

init();

weatherSearch.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.classList.contains('search__btn')) {
    const searchField = document.querySelector('.search__input');
    document.querySelector('.forecast').classList.add('loading');
    localStorage.setItem('city', searchField.value);
    clearInterval(clockInterval);

    init();
  }
});

document.querySelector('.temp').addEventListener('click', (event) => chooseTemp(event));
