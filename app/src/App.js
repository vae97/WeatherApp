import React, {useState} from 'react';
import Axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap';
import '../src/App.css';
import Animation from '../src/Animation'
//const link = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=df838830f58528a49a4bbf8e568da343';

const link='https://api.openweathermap.org/data/2.5/weather?q='
const key ='&appid=df838830f58528a49a4bbf8e568da343'
let url ;

function App() {

  
  

  // Basic Variables
  const [load, setLoading]= useState(false);
  
  const [city, setCity]= useState(null);

  //City
  const [cityi, setCityi] =useState(undefined);
  const [long, setLong] =useState(undefined);
  const [lat, setLat]   =useState(undefined);
  const [country, setCountry]= useState(undefined);

  //temperatures
  const [realtemp, setRealemp] = useState(undefined); 
  const [feeltemp, setFeeltemp]= useState(undefined);
  const [temp_min, setTempmin] =useState(undefined);
  const [temp_max, setTempmax] =useState(undefined);

  //Air
  const [sunrise, setSunrise] =useState (undefined);
  const [sunset, setSunset] =useState(undefined);
  const [pressure, setPreasure] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);

  //Wind
  const [windspeed, setWindspeed] =useState(undefined);
  const [winddirection, setWinddirection]=useState(undefined);


  function Read(r){
    setCity(r.target.value)
  }

  function Search(){
    console.log(city)

    url=link+city+key;
    //console.log(url);
    Axios.get(url).then((response)=>{

      //City fetch
      setCityi(response.data.name)
      setLong(response.data.coord.lon)
      setLat(response.data.coord.lat)
      setCountry(response.data.sys.country)

      //Temp fetch
      setRealemp(response.data.main.temp)
      setFeeltemp(response.data.main.feels_like)
      setTempmin(response.data.main.temp_min)
      setTempmax(response.data.main.temp_max)

      //Air fetch
      setSunrise(response.data.sys.sunrise);
      setSunset(response.data.sys.sunset);
      setPreasure(response.data.main.pressure);
      setHumidity(response.data.main.humidity);

      //wind fetch
      setWindspeed(response.data.wind.speed);
      setWinddirection(response.data.wind.deg);
      
    
    },
    (error)=>{
      alert("Oops! Something went Wrong !"+ error)
    })

    setLoading(true);
  }

  return (
    <div className="App">

      <Container className="search">

        <Row>
          <Col>
             <h1 className="metoza">Metoza</h1>
          </Col>
        </Row>
       
        <Row>
          <Col>
            <input type="text" onChange={Read} className="searchbar" placeholder="Type City Name"></input>
            <button onClick={Search} className="button">Search</button>
          </Col>
        </Row>
      </Container>

      {
        load ?

        <Container >
          <Row>
            <Col>
               <h1 className="heading">Location</h1>
               
                <div className="detail">
                  <h2 className="text">• City : {cityi}</h2>
                  <h2 className="text">• Longitude : {long}</h2>
                  <h2 className="text">• Latitude : {lat}</h2>
                  <h2 className="text">• Country : {country}</h2>
                </div>
                <hr></hr>
               
            </Col>
            <Col>
               <h1 className="heading">Temperature</h1>
               
                <div className="detail">
                  <h2 className="text">• Max Temperature : {Math.round(temp_max-272.15)} °C</h2>
                  <h2 className="text">• Min Temperature : {Math.round(temp_min-272.15)} °C</h2>
                  <h2 className="text">• Feel Temperature : {Math.round(feeltemp-272.15)} °C</h2>
                  <h2 className="text">• Avg Temperature : {Math.round(realtemp-272.15)} °C</h2>
                </div>
                <hr></hr>
               
            </Col>
            <Col>
               <h1 className="heading">Air</h1>
               
                <div className="detail">
                  <h2 className="text">• Pressure : {pressure} hPa</h2>
                  <h2 className="text">• Humidity : {humidity} %</h2>
                  <h2 className="text">• Sun Rise : {sunrise} UTC</h2>
                  <h2 className="text">• Sun Set : {sunset} UTC</h2>
                </div>
                <hr></hr>
               
            </Col>
            <Col>
               <h1 className="heading">Wind</h1>
               
                <div className="detail">
                  <h2 className="text">• Wind Speed : {windspeed} m/s</h2>
                  <h2 className="text">• Wind Direction : {winddirection}° </h2>
                </div>
                <hr></hr>
               
            </Col>
          </Row> 
        </Container>

        :

        <div className="animationparent">
          <div className="animationchild">
            <Animation></Animation>
          </div>
          <div className="textparent">
            <h1 className="font">Designed and Developed by Akash Ekanayaka</h1>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
