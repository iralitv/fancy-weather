function convertToCelcious(temp) {
  const celcious = Math.round((temp - 32) * (5 / 9));
  return celcious;
}

function convertToFahrenheit(temp) {
  const fahrenheit = Math.round((temp * (9 / 5)) + 32);
  return fahrenheit;
}

const convertTemp = () => {
  const isCelcius = localStorage.getItem('temp') === 'C';
  const temperatures = [];
  const tempContainers = document.querySelectorAll('.convert-temp');
  const tempUnits = document.querySelectorAll('.convert-temp__unit');

  const activeTemp = document.querySelector(`input[value=${localStorage.getItem('temp')}]`);
  activeTemp.setAttribute('checked', true);

  tempContainers
    .forEach((item) => temperatures.push(item.textContent));

  temperatures
    .map((temp) => (isCelcius ? convertToCelcious(temp) : convertToFahrenheit(temp)))
    .forEach((convertedTemp, index) => {
      tempContainers[index].textContent = `${convertedTemp}`;
      tempUnits[index].textContent = localStorage.getItem('temp');
    });
};

const chooseTemp = (event) => {
  if (event.target.textContent === localStorage.getItem('temp')) {
    return;
  }
  if (event.target.classList.contains('temp__label')) {
    localStorage.setItem('temp', event.target.textContent);
    console.log(localStorage.getItem('temp'));
    convertTemp();
  }
};


export { convertTemp, chooseTemp };
