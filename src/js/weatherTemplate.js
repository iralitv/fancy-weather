import { getCurrentLocation, getGeoCode } from './location';
import { getDateFromSec } from './date';

const weatherTemplate = (weather) => {
  const weatherContainer = document.querySelector('.forecast');
  const cityName = localStorage.getItem('city');
  const city = (cityName)
    ? getGeoCode(cityName.toLowerCase())
    : getCurrentLocation()
      .then((res) => getGeoCode(res.city));

  city
    .then((data) => {
      document.querySelector('.forecast__city').textContent = data.results[0].formatted;
    });

  weatherContainer.innerHTML = `
     <section class="forecast__today today">
        <p class="forecast__city"></p>
        <div class="forecast__date date">
          <p class="date__day">${getDateFromSec(weather.currently.time)}</p>
          <p class="date__time"></p>
        </div>
        <div class="forecast__desc desc">
          <div class="desc__image">
            <img class="forecast__icon" src="https://darksky.net/images/weather-icons/${weather.currently.icon}.png" alt="">
            <p class="forecast__temp">
              <span class="convert-temp">${Math.round(weather.currently.temperature)}</span>
              <span class="convert-temp__unit">C</span>
            </p>
          </div>
          <div class="desc__container">
            <p><span class="locale-weather-summary">Summary</span>: ${weather.currently.summary}</p>
            <p><span class="locale-weather-feels">Feels like</span>: 
              <span class="convert-temp">${Math.round(weather.currently.apparentTemperature)}</span>
              <span class="convert-temp__unit">C</span>
            </p>
            <p><span class="locale-weather-wind">Wind</span>: ${weather.currently.windSpeed} <span class="locale-weather-wind">m/s</span></p>
            <p><span class="locale-weather-humidity">Humidity</span>: ${weather.currently.humidity} %</p>
          </div>
        </div>
     </section>
     <section class="forecast__future future">
      <article class="future__item f-item">
        <p class="f-item__day">${getDateFromSec(weather.daily.data[1].time)}</p>
        <div class="f-item__forecast f-forecast">
          <p class="f-forecast__degree f-forecast__degree--max"><span class="locale-weather-max">Max</span>: 
            <span class="convert-temp">${Math.round(weather.daily.data[1].temperatureMax)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <p class="f-forecast__degree f-forecast__degree--min"><span class="locale-weather-min">Min</span>:
            <span class="convert-temp">${Math.round(weather.daily.data[1].temperatureMin)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <img src="https://darksky.net/images/weather-icons/${weather.daily.data[1].icon}.png" alt="" class="f-forecast__img">
        </div>
      </article>
      <article class="future__item f-item">
        <p class="f-item__day">${getDateFromSec(weather.daily.data[2].time)}</p>
        <div class="f-item__forecast f-forecast">
          <p class="f-forecast__degree f-forecast__degree--max"><span class="locale-weather-max">Max</span>:
            <span class="convert-temp">${Math.round(weather.daily.data[2].temperatureMax)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <p class="f-forecast__degree f-forecast__degree--min"><span class="locale-weather-min">Min</span>:
            <span class="convert-temp">${Math.round(weather.daily.data[2].temperatureMin)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <img src="https://darksky.net/images/weather-icons/${weather.daily.data[2].icon}.png" alt="" class="f-forecast__img">
        </div>
      </article>
      <article class="future__item f-item">
        <p class="f-item__day">${getDateFromSec(weather.daily.data[3].time)}</p>
        <div class="f-item__forecast f-forecast">
          <p class="f-forecast__degree f-forecast__degree--max"><span class="locale-weather-max">Max</span>:
            <span class="convert-temp">${Math.round(weather.daily.data[3].temperatureMax)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <p class="f-forecast__degree f-forecast__degree--min"><span class="locale-weather-min">Min</span>:
            <span class="convert-temp">${Math.round(weather.daily.data[3].temperatureMin)}</span>
            <span class="convert-temp__unit">C</span>
          </p>
          <img src="https://darksky.net/images/weather-icons/${weather.daily.data[3].icon}.png" alt="" class="f-forecast__img">
        </div>
      </article>
     </section>
  `;
};

export default weatherTemplate;
