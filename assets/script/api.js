
// current weather

  const currentWeatherInfo = async (city)=>{
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b369bc827b29eaf7791392481fd59d23`
    let resp = await fetch(currentWeatherUrl)
    let info = await resp.json()
    
    return info   
        
 }

//  !!current weather

export default currentWeatherInfo