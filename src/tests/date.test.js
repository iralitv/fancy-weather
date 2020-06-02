const dateTest = require('../js/date');

it('convert time sec in to dateTest format - day number month', () => {
  const convertedTime = dateTest.getDateFromSec(1294862756);
  expect(convertedTime).toBe('Wed 12 Jan');
});
