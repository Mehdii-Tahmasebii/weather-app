

const apiKey = `b369bc827b29eaf7791392481fd59d23`
// current weather

export const currentWeatherInfo = async (city)=>{
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const resp = await fetch(currentWeatherUrl)
    const info = await resp.json()
    
    return info   
        
 }

//  !!current weather

// current location
export const currentLocation = async (lat,lon) => {
console.log("🚀 ~ currentLocation ~ lon:", lon)
console.log("🚀 ~ currentLocation ~ lat:", lat)

  
  const currentLocationInfo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${apiKey}`
  const resp = await fetch(currentLocationInfo)
  const info = await resp.json()
  console.log("🚀 ~ currentLocation ~ info:", info)

  
  
  

} 


