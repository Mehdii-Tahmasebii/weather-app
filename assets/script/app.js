import searchCity from "./api.js"
import TodayWeather from '../components/TodayWeather/TodayWeather.js'


const $ = document
const seachBoxInput = $.querySelector('[data-search-box]');
const seachBoxInputBtn = $.querySelector('[data-search-btn]');
const asideElem = $.querySelector('[data-aside-elem]');

// elem defines
window.customElements.define('today-weather-box', TodayWeather)

// functions
const weatherInfoHandler = async ()=>{

   let cityName = seachBoxInput.value.toLowerCase()
   let weatherInfo = await searchCity(cityName)
   console.log("🚀 ~ weatherInfoHandler ~ weatherInfo:", weatherInfo)
   let weatherCloudsInfo = weatherInfo.weather[0];

   let { feels_like:feelsTemp, grnd_level:groundLevel, pressure, temp, temp_max:maxTemp, temp_min:minTemp } = weatherInfo.main
  


 
  
   todayWeatherHandler(temp, weatherInfo.name, weatherInfo.sys.country, weatherCloudsInfo.description, weatherCloudsInfo.icon )
   
   
   

}

const todayWeatherHandler = (temp, cityName, country, cloud, img )=>{
   asideElem.insertAdjacentHTML('afterbegin',`
      <today-weather-box>
      
      <h3 slot="today-temp">${temp}°</h3>
      <sapn slaot="city-name">${cityName}</sapn>
      <sapn slaot="country">${country}</sapn>
      <span slot="today-cloud">${cloud}</span>
      <img slot="today-img" src="./images/weather_icons/${img}.png" alt="weather" class="translate-y-1" />
      
      </today-weather-box>
      `
   )

}



seachBoxInputBtn.addEventListener('click', weatherInfoHandler)
seachBoxInput.addEventListener('keypress', e => e.keyCode === 13 &&  weatherInfoHandler())


