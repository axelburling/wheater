const api = {
  key: "3e61c9371d120a62bfc00f85bbd46ca6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchbox.value);
    searchbox.value = "";
  }
}

function getResult(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((wheater) => {
      return wheater.json();
    })
    .then(displayResults);
}

function displayResults(wheater) {
  let city = document.querySelector(".location .city");
  city.innerHTML = `${wheater.name}, ${wheater.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(wheater.main.temp)}<span>c</span>`;

  let wind = document.querySelector(".current .wind");
  wind.innerText = `${wheater.wind.speed}km/h`;

  let hilow = document.querySelector(".current .hi-low");
  hilow.innerText = `${Math.round(wheater.main.temp_min)}c / 
    ${Math.round(wheater.main.temp_max)}c`;

  let feel = document.querySelector(".current .feels-like");
  feel.innerText = `${wheater.main.feels_like}c`;
}

function dateBuilder(d) {
  let monhts = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = monhts[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
