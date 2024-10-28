import {
  currentWeatherInfo,
  currentLocation,
  currentLocationByCity,
  currentAirPollution,
} from "./api.js";

const $ = document;
const preloading = $.querySelector("[data-preloading-effect]");
const fetchErr = $.querySelector("[data-fetch-err]");

// search box
const seachBoxInput = $.querySelector("[data-search-box]");
const seachBoxInputBtn = $.querySelector("[data-search-btn]");
const seachBoxInvalidPlace = $.querySelector("[data-invalid-place-err]");

// today Weather
const currentLocationBtn = $.querySelector("[data-current-locatin-btn]");
const tempTodayElem = $.querySelector("[data-today-temp]");
const todayCloudeIconElem = $.querySelector("[data-today-cloude]");
const todayCloudeInfoElem = $.querySelector("[data-today-cloude-info]");
const todayDateElem = $.querySelector("[data-today-date]");
const currentCountryElem = $.querySelector("[data-country]");
const currentCityElem = $.querySelector("[data-city]");
const currentLocationErr = $.querySelector("[data-current-location-err]");

// main section subs & sup
const currentHumidity = $.querySelector("[data-humidity]");
const currentPressure = $.querySelector("[data-pressure]");
const currentVisibility = $.querySelector("[data-visibility]");
const currentFeelsLike = $.querySelector("[data-feels-like]");
const currentDaySunrise = $.querySelector("[data-sunrise]");
const currentDaySunset = $.querySelector("[data-sunset]");

// air pollution
const currentpollustionDescription = $.querySelector("[data-air-description]");
const currentpollustionPM = $.querySelector("[data-air-quality-pm]");
const currentpollustionSO = $.querySelector("[data-air-quality-so]");
const currentpollustionNO = $.querySelector("[data-air-quality-no]");
const currentpollustionO = $.querySelector("[data-air-quality-o]");

// local storage

let starterLocation = localStorage.getItem("lastLocation") || "tehran";

// functions
const weatherInfoHandler = async (city) => {
  localStorage.setItem("lastLocation", city);
  seachBoxInput.value = "";
  // preloader
  preloading.classList.remove("hidden");
  preloading.classList.add("flex");

  // fetch city data
  const cityName = city;
  const weatherInfo = await currentWeatherInfo(cityName);
  if (typeof weatherInfo === "number") {
    // preloader
    preloading.classList.remove("flex");
    preloading.classList.add("hidden");
    //  err
    seachBoxInvalidPlace.classList.remove("opacity-0");
    seachBoxInvalidPlace.classList.remove("invisible");
    seachBoxInvalidPlace.classList.add("opacity-100");
    seachBoxInvalidPlace.classList.add("visible");

    setTimeout(() => {
      seachBoxInvalidPlace.classList.remove("opacity-100");
      seachBoxInvalidPlace.classList.remove("visible");
      seachBoxInvalidPlace.classList.add("opacity-0");
      seachBoxInvalidPlace.classList.add("invisible");
    }, 3000);
  } else if (weatherInfo) {
    localStorage.setItem("lastLocation", city);
    const [geoLocationInfo] = await currentLocationByCity(city);
    const { list } = await currentAirPollution(
      geoLocationInfo.lat,
      geoLocationInfo.lon
    );

    // deconstructing and organizing data
    const components = list[0].components;
    const airQI = list[0].main.aqi;
    let weatherCloudsInfo = weatherInfo.weather[0];
    let { humidity, feels_like: feelsTemp, pressure, temp } = weatherInfo.main;
    let { country, sunrise, sunset } = weatherInfo.sys;
    let sunriseDate = new Date(sunrise * 1000);
    let sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`;
    let sunsetDate = new Date(sunset * 1000);
    let sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`;

    // calling back funcs
    todayWeatherHandler(
      temp,
      weatherInfo.name,
      country,
      weatherCloudsInfo.description,
      weatherCloudsInfo.icon
    );
    todayHighlightsHandler(
      feelsTemp,
      humidity,
      pressure,
      Math.floor(weatherInfo.visibility / 1000),
      sunriseTime,
      sunsetTime
    );
    todayAirPollutionHandler(
      components.pm2_5,
      components.so2,
      components.no2,
      components.o3,
      airQI
    );
    dateHandler();

    // preloader
    preloading.classList.remove("flex");
    preloading.classList.add("hidden");
  } else if (!weatherInfo) {
    localStorage.setItem("lastLocation", city);
    // preloader
    preloading.classList.remove("flex");
    preloading.classList.add("hidden");
    //  err
    fetchErr.classList.remove("-top-9");
    fetchErr.classList.add("top-0");
    setTimeout(() => {
      fetchErr.classList.remove("top-0");
      fetchErr.classList.add("-top-9");
    }, 3000);
  } 


  //!!weatherInfoHandler
};

const todayWeatherHandler = (temp, cityName, country, cloud, icon) => {
  tempTodayElem.innerHTML = `${Math.floor(temp - 273.15)}°`;
  todayCloudeIconElem.setAttribute("src", `./images/weather_icons/${icon}.png`);
  todayCloudeInfoElem.innerHTML = cloud;
  currentCountryElem.innerHTML = country;
  currentCityElem.innerHTML = cityName;
};
const todayHighlightsHandler = (
  feelsTemp,
  humidity,
  pressure,
  visibility,
  sunriseTime,
  sunsetTime
) => {
  currentHumidity.innerHTML = humidity;
  currentPressure.innerHTML = pressure;
  currentVisibility.innerHTML = visibility;
  currentFeelsLike.innerHTML = `${Math.floor(feelsTemp - 273.15)}°`;
  currentDaySunrise.innerHTML = sunriseTime;
  currentDaySunset.innerHTML = sunsetTime;
};
const todayAirPollutionHandler = (pm, so2, no2, o3, airQI) => {
  currentpollustionPM.innerHTML = pm;
  currentpollustionSO.innerHTML = so2;
  currentpollustionNO.innerHTML = no2;
  currentpollustionO.innerHTML = o3;

  if (airQI === 1) {
    currentpollustionDescription.innerHTML = "Very Good";
    currentpollustionDescription.style.backgroundColor = "#059669";
    currentpollustionDescription.style.color = "#fff";
  } else if (airQI === 2) {
    currentpollustionDescription.innerHTML = "Good";
    currentpollustionDescription.style.backgroundColor = "#0EA5E9";
    currentpollustionDescription.style.color = "#fff";
  } else if (airQI === 3) {
    currentpollustionDescription.innerHTML = "Moderate";
    currentpollustionDescription.style.backgroundColor = "#FDE047";
    currentpollustionDescription.style.color = "#52525B";
  } else if (airQI === 4) {
    currentpollustionDescription.innerHTML = "Bad";
    currentpollustionDescription.style.backgroundColor = "#FFA726";
    currentpollustionDescription.style.color = "#52525B";
  } else if (airQI === 5) {
    currentpollustionDescription.innerHTML = "Dangerous";
    currentpollustionDescription.style.backgroundColor = "#EF4444";
    currentpollustionDescription.style.color = "#52525B";
  }
};
const currentLocationHandler = () => {
  // failed
  const fail = (err) => {
    currentLocationErr.classList.remove("-top-9");
    currentLocationErr.classList.add("top-0");
    setTimeout(() => {
      currentLocationErr.classList.remove("top-0");
      currentLocationErr.classList.add("-top-9");
    }, 3000);
  };

  // get current loc
  const success = (position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    geoToCityHandler(lat, lon);
  };
  navigator.geolocation.getCurrentPosition(success, fail, {
    maximumAge: 60000,
    timeout: 5000,
    enableHighAccuracy: true,
  });
};
const geoToCityHandler = async (lat, lon) => {
  const currentLocationInfo = await currentLocation(lat, lon);
  const [cityInfo] = currentLocationInfo;
  localStorage.setItem("lastLocation", cityInfo.name.toLowerCase());
  weatherInfoHandler(cityInfo.name);
};
const dateHandler = () => {
  const months = [
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
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const todayDate = new Date();

  // organizing
  const day = weekdays[todayDate.getDay()];
  const month = months[todayDate.getMonth()];
  const year = todayDate.getFullYear();
  const date = todayDate.getDate();

  todayDateElem.innerHTML = `${day}, ${date} ${month} ${year}`;
};

// events
seachBoxInputBtn.addEventListener("click", () =>
  weatherInfoHandler(seachBoxInput.value)
);
seachBoxInput.addEventListener(
  "keypress",
  (e) => e.keyCode === 13 && weatherInfoHandler(e.target.value)
);
currentLocationBtn.addEventListener("click", currentLocationHandler);
weatherInfoHandler(starterLocation);
