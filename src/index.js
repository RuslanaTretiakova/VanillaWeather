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
  function displayTemperature(response) {
    const tempElement = document.querySelector("#city-temp");
    const cityElement = document.querySelector("#city");
    const descriptionElement = document.querySelector("#description");
    const humidityElement = document.querySelector("#humidity");
    const windElement = document.querySelector("#wind");
    const dateElement = document.querySelector("#date");
    const imgElement = document.querySelector("#icon");
  
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    imgElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    imgElement.setAttribute("alt", response.data.weather[0].description);
  }
  function search(city) {
    const apiKey = "1adc539812270320dcf2ee9860cbdb06";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  function showCity(event) {
    event.preventDefault();
    const cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }
  const formControl = document.querySelector("#search-form");
  formControl.addEventListener("submit", showCity);
  