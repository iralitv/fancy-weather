import memoize from './memoize';

const getCurrentLocation = memoize(async () => {
  const LOCATION_API_KEY = '2d113ec3eae119';
  const locationUrl = `https://ipinfo.io/json?token=${LOCATION_API_KEY}`;

  try {
    const response = await fetch(locationUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    return e.message;
  }
});

const getGeoCode = memoize(async (cityName) => {
  const GEOCODE_API_KEY = '7f9d099315954889bc2d60af0e807f53';
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${GEOCODE_API_KEY}&pretty=1&no_annotations=1&language=en`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
});

const getUserLocation = async () => {
  const cityName = localStorage.getItem('city');
  return (cityName)
    ? getGeoCode(cityName.toLowerCase())
      .then((data) => Object.values(data.results[0].geometry))
      .catch((e) => document.querySelector('.forecast__notification').textContent = `No results for ${cityName}`)
    : getCurrentLocation()
      .then((data) => data.loc.split(','));
};

const geoCoords = document.querySelector('.geolocation');

const geoLocation = (coords) => {
  const [latitude, longitude] = coords;
  const latitudeArray = latitude.toString().split('.');
  const longitudeArray = longitude.toString().split('.');

  geoCoords.innerText = `Latitude: ${latitudeArray[0]}°${latitudeArray[1].slice(0, 2)}'
                         Longitude: ${longitudeArray[0]}°${longitudeArray[1].slice(0, 2)}'`;

  document.getElementById('map-container-id').appendChild(geoCoords);
};

export {
  getUserLocation, geoLocation, getGeoCode, getCurrentLocation,
};
