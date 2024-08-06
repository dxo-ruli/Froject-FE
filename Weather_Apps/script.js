const apiKey = "d19f9007d47b3b2af75dc6e014c7dbe2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");        //input didalam class search
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);     //membuat link pencasian sesuai input 
    
    if (response.status ==404) {
        document.querySelector(".error").style.display = "block";       //error bakal show
        document.querySelector(".weather").style.display = "none";       //.weather g akan terlihat
    } else {
        var data = await response.json();                              //mengubah API menjadi format JSON agar dapat di olah oleh JS

        document.querySelector(".city").innerHTML = data.name;             //.innerHTML digunakan untuk mengubah konten html nya (textnya)
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";         //Math.round membulatkan bilangan
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/cloud.png"
        } 
        else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        } 
        else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        } 
        else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        } 
        else if (data.weather[0].main == "Mist" || "Haze"){
            weatherIcon.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none";          // error message g terlihat
    }
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value)          //searchBox.value adalah value yang di input dari search box
})