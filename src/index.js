let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

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

let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `Last updated: ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let cityName = document.querySelector(".city");
  cityName.innerHTML = city;
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `       <div class="col">
                <div class="day">${formatForecast(forecastDay.dt)}</div>
                
          <div class="emoji"><img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" id="emoji" 
        /> </div>
                <div class="temp"><span class="temp-min">${Math.round(
                  forecastDay.temp.min
                )}</span>° | <span class="temp-max">${Math.round(
          forecastDay.temp.max
        )}</span>°</div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let excluded = "current,minutely,hourly,alerts";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${excluded}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector(".city");
  let country = response.data.sys.country;
  let countryName = document.querySelector(".country");
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp");
  let tempMessage = `${temperature}°C`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  let windMessage = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  let humidityMessage = `Humidity: ${humidity}%`;
  feels = response.data.main.feels_like;
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round(feels);
  let iconElement = document.querySelector("#icon");

  cityName.innerHTML = city;
  countryName.innerHTML = country;
  descriptionElement.innerHTML = description;
  currentTemp.innerHTML = tempMessage;
  windSpeed.innerHTML = windMessage;
  currentHumidity.innerHTML = humidityMessage;
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;
  celsius = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".location-btn");
locationButton.addEventListener("click", getCurrentPosition);

let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
let units = "metric";
let city = "Poznań";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
let temp = true;

function changeUnitF() {
  let currentTemp = document.querySelector(".current-temp");
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheit}°F`;
  fahrenheitButton.innerHTML = "°C";
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round((feels * 9) / 5 + 32);
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;

  let maxForecast = document.querySelectorAll(".temp-max");
  maxForecast.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  let minForecast = document.querySelectorAll(".temp-min");
  minForecast.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
}

function changeUnitC() {
  let currentTemp = document.querySelector(".current-temp");
  let celsiusTemp = Math.round(celsius);
  currentTemp.innerHTML = `${celsiusTemp}°C`;
  fahrenheitButton.innerHTML = "°F";
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round(feels);
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;

  let maxForecast = document.querySelectorAll(".temp-max");
  maxForecast.forEach(function (item) {
    let currentTemp = item.innerHTML;

    item.innerHTML = Math.round((currentTemp - 32) * (5 / 9));
  });

  let minForecast = document.querySelectorAll(".temp-min");
  minForecast.forEach(function (item) {
    let currentTemp = item.innerHTML;

    item.innerHTML = Math.round((currentTemp - 32) * (5 / 9));
  });
}

function changeUnit(event) {
  event.preventDefault();
  if (temp) changeUnitF();
  else changeUnitC();
  temp = !temp;
}

let celsius = null;
let feels = null;

let fahrenheitButton = document.querySelector(".unit");
fahrenheitButton.addEventListener("click", changeUnit);
