const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const cityName = document.querySelector('h2.city_name');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelslike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressuer');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollutionImg = document.querySelector('img.pollituion_img');
const pollutionValue = document.querySelector('span.pollution_value');

const apiInfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : '&appid=37517a3706aa51721cb407029173a135',
    units :'&units=metric',
    lang : '&lang=pl'
}

function getWeatherInfo(){
    const apiInfoCity = input.value;
    const URL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    //console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`; // miasto
        weatherImg.src =`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png

`; // pobieranie wartosci z api i wypisywanie ich w przeglądarce

        temp.textContent = `${Math.round(response.data.main.temp)} °C`; // temperatura
        description.textContent = `${response.data.weather[0].description}`; // opis
        feelslike.textContent = `${Math.round(response.data.main.feels_like)} °C`; // odczuwalna
        pressure.textContent =`${Math.round(response.data.main.pressure)} hpa`; // ciśnienie
        humidity.textContent = `${Math.round(response.data.main.humidity)} %`; // wilgotność
        visibility.textContent =`${Math.round(response.data.visibility)/1000} km`; // widoczność
        clouds.textContent =`${Math.round(response.data.clouds.all)} %`; // zachmurzenie
        windSpeed.textContent =`${Math.round(response.data.wind.speed)} km/h`; // prędkość wiatru
        errorMsg.textContent = "";
        // kolejne api
        const urlPollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${apiInfo.key}`;
        axios.get(urlPollution).then((res) => {
            console.log(res.data);
            pollutionValue.textContent = `${res.data.list[0].components.pm2_5}`
        })

        // wyświetlanie error i usuwanie wartosci z wczesniejszego miasta
    }).catch((error) => {
        errorMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, description, humidity, visibility, pressure, clouds, windSpeed, feelslike ].forEach(el => {
            el.textContent = ``;
        })

    }).finally(() => {
        input.value = ``;
    })
}

function getWeatherInfoByEnter (e) {
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', getWeatherInfoByEnter);