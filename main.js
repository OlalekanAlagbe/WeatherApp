const apikey = "771c2d14d5c5a655f56442c26d223c2e";
const weatherDataEL = document.getElementById("weather-data");
const cityInputEL = document.getElementById("city-input");
const formEL = document.querySelector("form");


formEL.addEventListener("submit", (e)=>{
    e.preventDefault()
    const cityValue = cityInputEL.value;
    // console.log(cityValue)
    getWeatherData(cityValue);
})


let getWeatherData = async (param)=>{
    try {
        console.log("I am here")

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json()

        console.log(data);
        console.log("I am here")
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        let details = [`Feels like: ${Math.round(data.main.feels_like)}`,`Humidity:${data.main.humidity}%`,`Wind speed:${data.wind.speed}m/s`]
        let detailsHTML = details.map((item)=>{
            return `<div>${item}</div>`;
        }).join("")
        // console.log(detailsHTML)

        weatherDataEL.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherDataEL.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEL.querySelector(".description").textContent = `${description}`;
        weatherDataEL.querySelector(".details").innerHTML = `${detailsHTML}`;
        weatherDataEL.querySelector(".error-msg").style.display = "none";
    } catch (error) {
        weatherDataEL.querySelector(".error-msg").innerHTML = `<h3> An error happened, please try again</h3>`; 
    }
}