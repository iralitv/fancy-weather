import moment from 'moment';
import 'moment-timezone';

const getDateFromSec = (ms) => {
  const date = new Date(+`${ms}000`);
  const getDate = date.toString().split(' ');
  const [day, month, number] = [getDate[0], getDate[1], getDate[2]];

  return `${day} ${number} ${month}`;
};

const clock = (timezone = 'Europe/Minsk') => {
  const clockContainer = document.querySelector('.date__time');

  if (clockContainer) {
    const clockWithTimezone = moment().tz(timezone).format('hh:mm:ss a');
    clockContainer.textContent = `${clockWithTimezone}`;
  }
};

export { getDateFromSec, clock };
