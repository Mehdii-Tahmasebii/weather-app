import {currentWeatherInfo, currentLocation} from "./api.js";

const $ = document;
const seachBoxInput = $.querySelector("[data-search-box]");
const seachBoxInputBtn = $.querySelector("[data-search-btn]");
const currentLocationBtn = $.querySelector("[data-current-locatin-btn]");
const tempTodayElem = $.querySelector("[data-today-temp]");
const todayCloudeIconElem = $.querySelector("[data-today-cloude]");
const todayCloudeInfoElem = $.querySelector("[data-today-cloude-info]");
const todayDateElem = $.querySelector("[data-today-date]");
const currentCountryElem = $.querySelector("[data-country]");
const currentCityElem = $.querySelector("[data-city]");
const currentLocationErr = $.querySelector("[data-current-location-err]");

// functions
const weatherInfoHandler = async (city) => {
  let cityName = city;
  let weatherInfo = await currentWeatherInfo(cityName);
  console.log("🚀 ~ weatherInfoHandler ~ weatherInfo:", weatherInfo);
  let weatherCloudsInfo = weatherInfo.weather[0];

  let {
    feels_like: feelsTemp,
    grnd_level: groundLevel,
    pressure,
    temp,
    temp_max: maxTemp,
    temp_min: minTemp,
  } = weatherInfo.main;

  todayWeatherHandler(
    temp,
    weatherInfo.name,
    weatherInfo.sys.country,
    weatherCloudsInfo.description,
    weatherCloudsInfo.icon
  );
};

const todayWeatherHandler = (temp, cityName, country, cloud, icon) => {
  tempTodayElem.innerHTML = `${Math.floor(temp - 273.15)}°`;
  todayCloudeIconElem.setAttribute("src", `./images/weather_icons/${icon}.png`);
  todayCloudeInfoElem.innerHTML = cloud;
  currentCountryElem.innerHTML = country;
  currentCityElem.innerHTML = cityName;
};
const currentLocationHandler = () => {
  const fail = () => {
    currentLocationErr.classList.remove("-top-9");
    currentLocationErr.classList.add("top-0");
    setTimeout(() => {
      currentLocationErr.classList.remove("top-0");
      currentLocationErr.classList.add("-top-9");
    }, 3000);
  };
  const success = (position) => {
    console.log("🚀 ~ success ~ position:", position)
    let lon = position.coords.longitude;
    console.log("🚀 ~ success ~ lon:", lon)
    let lat = position.coords.latitude;
    console.log("🚀 ~ success ~ lat:", lat)
   
     
    
    
  };
 navigator.geolocation.getCurrentPosition(success, fail, {maximumAge:60000, timeout:5000, enableHighAccuracy:true})
};

seachBoxInputBtn.addEventListener("click", () =>
  weatherInfoHandler(seachBoxInput.value)
);
seachBoxInput.addEventListener(
  "keypress",
  (e) => e.keyCode === 13 && weatherInfoHandler(e.target.value)
);
currentLocationBtn.addEventListener("click", currentLocationHandler);
