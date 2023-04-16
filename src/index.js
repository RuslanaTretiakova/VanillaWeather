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
  function showFahrenheitTemp(event) {
    event.preventDefault();

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    const tempElement = document.querySelector("#city-temp");
    tempElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  function showCelsiusTemp(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    const tempElement = document.querySelector("#city-temp");
    tempElement.innerHTML = Math.round(celsiusTemperature);
  }

  const formControl = document.querySelector("#search-form");
  formControl.addEventListener("submit", showCity);

  const fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemp);

  const celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemp);
  
   search("London");