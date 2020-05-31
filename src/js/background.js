const imageContainer = document.querySelector('.img__container');
const imageReload = document.querySelector('.header__img');

const backgroundImage = async () => {
  const city = localStorage.getItem('city').toLowerCase() || 'minsk';
  const IMAGE_API_KEY = 'd17326fa14ae234e07091f4bd4fcadf9515b23b6cab3182c7a4d4b9a25da3882';
  const imageUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${city}&client_id=${IMAGE_API_KEY}`;
  try {
    const response = await fetch(imageUrl);
    const data = await response.json();

    return data.urls.regular;
  } catch (e) {
    return e.message;
  }
};

const parseImage = (imageUrl) => {
  imageContainer.style.backgroundImage = `url('${imageUrl}')`;
};

const changeBackground = () => {
  backgroundImage()
    .then((url) => parseImage(url));
};

imageReload.addEventListener('click', changeBackground);

export default changeBackground;
