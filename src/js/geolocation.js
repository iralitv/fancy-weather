const geoLocation = (coords) => {
  const [latitude, longitude] = coords;
  const latitudeArray = latitude.toString().split('.');
  const longitudeArray = longitude.toString().split('.');

  return `<span class="locale-geocoords">Latitude</span>: ${latitudeArray[0]}°${latitudeArray[1].slice(0, 2)}' 
          <span class="locale-geocoords">Longitude</span>: ${longitudeArray[0]}°${longitudeArray[1].slice(0, 2)}'`;
};

const writeCoords = (coords) => {
  const formattedCoords = geoLocation(coords);
  const geoCoords = document.querySelector('.geolocation');
  geoCoords.innerHTML = formattedCoords;
  document.getElementById('map-container-id').appendChild(geoCoords);
};

module.exports = { geoLocation, writeCoords };
