let now = new Date();
let h2 = document.querySelector("h2");
function formatDate(Date) {
  let currentDate = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let time = now.getHours() + ":" + now.getMinutes();
  console.log(time);

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
  h2.innerHTML = `${day} ${month} ${currentDate}, ${year} ${hours}:${minutes}`;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = `daa0c653434e1987a3668a7490294142`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp);
}
console.log(formatDate(Date()));

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function currentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `daa0c653434e1987a3668a7490294142`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels = document.querySelector("#feels_like");
  let pressure = document.querySelector("#pressure");
  let h3 = document.querySelector("#temp-value");
  let h1 = document.querySelector("h1");
  h3.innerHTML = `${temperature}`;
  h1.innerHTML = `${city}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  wind.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  feels.innerHTML = `Feels like: ${response.data.main.feels_like}°F`;
  pressure.innerHTML = `Air Pressure: ${response.data.main.pressure}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let h1 = document.querySelector("#current-weather");
h1.addEventListener("click", getCurrentPosition);
