import '../sass/style.scss';
import { chooseTemp } from './convertTemp';
import { searchWeather, handleSearch } from './searchWeather';
import changeLanguage from './locale';

const weatherSearchForm = document.querySelector('.search__form');
const languageSelector = document.querySelector('.lang');
const tempSelector = document.querySelector('.temp');

searchWeather()
  .then(changeLanguage);

weatherSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  handleSearch();
});

languageSelector.value = localStorage.getItem('language') || 'en';

languageSelector.addEventListener('change', (event) => {
  changeLanguage(event);
});

tempSelector.addEventListener('click', (event) => chooseTemp(event));
