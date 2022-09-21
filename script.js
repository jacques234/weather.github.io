const API_KEY = 'b3df5535dcd36db1b4326c69fb16b24f';
const fetchData = position =>{
    const { latitude, longitude}=position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data));
    
}

const setWeatherData = data =>{
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key =>{
        document.getElementById(key).textContent = weatherData[key];
    });


    cleanUp();
}


const cleanUp =()=>{
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
    loader.style.display = 'none';
    container.style.display = 'flex';
}


const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
const onLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}

