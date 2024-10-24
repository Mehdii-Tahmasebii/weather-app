const apiKey = `b369bc827b29eaf7791392481fd59d23`;
// current weather

export const currentWeatherInfo = async (city) => {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const resp = await fetch(currentWeatherUrl);
  const info = await resp.json();

  return info;
};

//  !!current weather

// current location
export const currentLocation = async (lat, lon) => {
  const currentLocationInfo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${apiKey}`;
  const resp = await fetch(currentLocationInfo);
  const info = await resp.json();

  return info;
};
export const currentLocationByCity = async (city) => {
  const currentLocationInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  const resp = await fetch(currentLocationInfo);
  const info = await resp.json();
 

  return info;
};

// !!current location

// air pollution
export const currentAirPollution = async (lat, lon) => {
  const currentAirPollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const resp = await fetch(currentAirPollution);
  const info = await resp.json();
  console.log("🚀 ~ currentLocationByCity ~ info:", info)

  return info;
};

