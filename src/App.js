import React, {useState} from "react";
import axios from 'axios'


function App() {

  const[data,setData] = useState({})

  const [location,setLocation] = useState('')
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cfe3680ea9980a488c051509c5737ae5`


  
  const searchLocation = (event) => {
    if(event.key === "Enter") {
      axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data)
    }) 
    .catch((error)=> {
      console.error("Error fetching Data:", error);
    })
    setLocation('')
  }
}
  return (
    <div className="app">
    <div className="search">
      <input
        type="text"
        value={location}
        placeholder="Location?"
        onKeyPress={searchLocation}
        onChange={(event) => setLocation(event.target.value)}
      />
    </div>
    <div className = "container">
      <div className = "top">
        <div className = "location">
          <p>{data.name}</p>
        </div>
        <div className = "temp">
        {data.main ? <h1>{Math.round(data.main.temp - 273.15 ) + "°C"}</h1> : null}
        </div>
        <div className= "description">
        {data.weather ? <p>{data.weather[0].main}</p>:null}
        </div>
      </div>
      <div className = "bottom">
        <div className = "feels">
        {data.weather ? <p className="bold 
        ">{Math.round(data.main.feels_like - 273.15) + "°C" }</p> : null} 
          <p>Feels Like</p>
        </div>
        <div className ="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
        {data.main ? <p className="bold">{data.wind.speed} MPH </p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default App;
