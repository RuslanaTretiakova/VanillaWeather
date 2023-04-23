function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const day = days[date.getDay()];
  return `${day} , ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  const date = new Date(timestamp *1000);
  const day = date.getDay();
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat" 
  ];

  return days[day];
}
function showForecast(response) {
  const dailyForecast = response.data.daily;
  const forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if(index < 7) {
      forecastHTML +=
      `
      <div class="forecast-border">
      <div class="forecast-weekday">
      <span>${formatDay(forecastDay.dt)}</span>
      </div>
          <div class="forecast-icon">
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon" width="48px"/>
          </div>
          <div class="forecast-temperatures">
              <div class="forecast-temperature-max">
                  <span>${Math.round(forecastDay.temp.max)}°</span>
              </div>
              <div class="forecast-temperature-min">
              <span>${Math.round(forecastDay.temp.min)}°</span>
              </div>
              </div>
              </div>
        `;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
function getForecastWeatherData(coordinates) {
  console.log(coordinates);
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(showForecast);
}
function showCurrentMetrics(response) {
  const tempElement = document.querySelector("#city-temp");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windElement = document.querySelector("#wind");
  const dateElement = document.querySelector("#date");
  const imgElement = document.querySelector("#icon");
  
  celsiusTemperature = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  imgElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  imgElement.setAttribute(
    "alt", response.data.weather[0].description
    );
    getForecastWeatherData(response.data.coord);
  }
  function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentMetrics);
  }
  function showCity(event) {
    event.preventDefault();
    const cityInputElement = document.querySelector("#city-input");
    getWeatherData(cityInputElement.value);
  }
  function showCelsiusTemp(event) {
    event.preventDefault();
    
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    
    const tempElement = document.querySelector("#city-temp");
    tempElement.innerHTML = Math.round(celsiusTemperature);
  }
  function showFahrenheitTemp(event) {
  event.preventDefault();
  
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active"); 
  
  const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  const tempElement = document.querySelector("#city-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
function getGeolocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const positionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(positionUrl).then(showCurrentMetrics);
}
function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(getGeolocation);
}

const currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", showCurrentLocationWeather);

let celsiusTemperature = null;

const apiKey = "96771e971243152d6b8948878c26adde";

const formControl = document.querySelector("#search-form");
formControl.addEventListener("submit", showCity);

const fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

getWeatherData("Kyiv");