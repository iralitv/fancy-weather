import moment from 'moment';
import 'moment-timezone';

const clock = (timezone = 'Europe/Minsk') => {
  const clockContainer = document.querySelector('.date__time');

  if (clockContainer) {
    const clockWithTimezone = moment().tz(timezone).format('hh:mm:ss a');
    clockContainer.innerHTML = `${clockWithTimezone}`;
  }
};

export default clock;
