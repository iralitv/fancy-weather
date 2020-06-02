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
      .catch((e) => {
        document.querySelector('.forecast__notification').textContent = `No results for ${cityName}`;
        return e;
      })
    : getCurrentLocation()
      .then((data) => data.loc.split(','));
};

export {
  getUserLocation,
  getGeoCode,
  getCurrentLocation,
};
