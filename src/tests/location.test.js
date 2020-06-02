const geolocation = require('../js/geolocation');

it('calculate coords', () => {
  const geoCoords = geolocation.geoLocation([53.902334, 27.5618791]);
  expect(geoCoords).toBe("Latitude: 53°90' Longitude: 27°56'");
});
