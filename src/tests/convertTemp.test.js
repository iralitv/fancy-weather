const conventor = require('../js/convertTemp');

it('convert from F to C', () => {
  const celcious = conventor.convertToCelcious(54);
  expect(celcious).toBe(12);
});

it('convert from C to F', () => {
  const fahrenheit = conventor.convertToFahrenheit(12);
  expect(fahrenheit).toBe(54);
});
