import apiKey from "./apikey.js";

function weather(city) {
  // const apiKey = process.env.API_KEY1;
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  const unit = "metric";
  const language = "en";

  // const city = document.querySelector(".search-bar").value;

  // making the API call
  const apiUrl = `${endpoint}?q=${city}&units=${unit}&lang=${language}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Extract needed data
      const locationName = data.name;
      const locationCountry = data.sys.country;
      const temperature = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;
      const imgDescription = data.weather[0].description;
      const feelsLike = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      console.log(
        locationName,
        locationCountry,
        temperature,
        iconCode,
        imgDescription,
        humidity,
        windSpeed
      );
      document.querySelector(
        ".city"
      ).textContent = `${locationName}, ${locationCountry}`;
      document.querySelector(
        ".weather-icon"
      ).src = `http://openweathermap.org/img/wn/${iconCode}.png`;
      document.querySelector(".temperature").textContent = `${temperature}°C`;
      document.querySelector(".description").textContent = `${imgDescription}`;
      document.querySelector(
        ".feels-like"
      ).textContent = `Feels like: ${feelsLike}°C`;
      document.querySelector(
        ".humidity"
      ).textContent = `Humidity: ${humidity}%`;
      document.querySelector(
        ".wind"
      ).textContent = `Wind speed: ${windSpeed}km/h`;
    });

  document.querySelector(".card").classList.remove("js-loading");
}

// Image searching API:
function getBackgroundImg(city2) {
  const endpoint2 = `https://api.unsplash.com/search/photos`;
  const unsplash = "0bvni6lrimPNrUpgnvJqKM6CiTq5ZOtfMC7LsXATJ9I";
  // const apiKey2 = process.env.API_KEY2;
  const apiUrl2 = `${endpoint2}?client_id=${unsplash}&page=1&query=${city2}`;

  fetch(apiUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Extract needed data
      const backgroundImg = data.results[0].links.download;
      console.log(backgroundImg);
      document.body.style.backgroundImage = `url(${backgroundImg})`;
    });
}

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", function () {
  getBackgroundImg(document.querySelector(".search-bar").value);
  weather(document.querySelector(".search-bar").value);
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      getBackgroundImg(document.querySelector(".search-bar").value);
      weather(document.querySelector(".search-bar").value);
    }
  });

getBackgroundImg("London");
weather("London");
