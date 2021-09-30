function displayTemperature(response) {
  console.log(response);
  let cityName = response.data.name;
  let temperatureDisplay = document.querySelector("#current-temperature");
  let cityHeader = document.querySelector("h1");
  let feelsLike = response.data.main.feels_like;
  let feelsLikeDisplay = document.querySelector("#feels-like");
  let humidityDisplay = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#current-description");
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  cityHeader.innerHTML = cityName;
  feelsLikeDisplay.innerHTML = Math.round(feelsLike);
  humidityDisplay.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
}

function weatherReturn(event) {
  event.preventDefault();
  let searchForm = document.querySelector("#search-form");
  let cityInput = document.querySelector("#search-input");
  let cityName = cityInput.value;
  let units = "metric";
  let apiKey = "88bba71914832f5391f5f9e17c55e7bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", weatherReturn);

function showGpsPosition(response) {
  console.log(response);
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let units = "metric";
  let apiKey = "d62b9f500f4938fde12e0ac245421a5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getGpsLocation() {
  navigator.geolocation.getCurrentPosition(showGpsPosition);
}

let gpsButton = document.querySelector("#gps-search");
gpsButton.addEventListener("click", getGpsLocation);

// Local Time

let todaysDate = document.querySelector("#current-date");
let now = new Date();
let currentMonth = now.getMonth();
let currentDay = now.getDay();
let currentDate = now.getDate();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4];
todaysDate.innerHTML = `${days[currentDay]} ${months[currentMonth]} ${currentDate} ${currentHour}:${currentMinutes}`;

function changeToFahrenheit() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `75°F`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFahrenheit);

function showCelsius() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = "25°C";
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", showCelsius);
