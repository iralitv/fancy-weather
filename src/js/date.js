const getDateFromSec = (ms) => {
  const date = new Date(+`${ms}000`);
  const getDate = date.toString().split(' ');
  const [day, month, number] = [getDate[0], getDate[1], getDate[2]];

  return `${day} ${number} ${month}`;
};

module.exports = { getDateFromSec };
