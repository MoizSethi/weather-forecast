const apiKey = "0cb61665ada222c168b20fc8e403e186"; // API key for OpenWeatherMap API
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Base URL for fetching weather data
const searchBox = document.querySelector(".search input"); // Reference to the input element for city search
const searchBtn = document.querySelector(".search button"); // Reference to the button element for triggering the search
const icon = document.querySelector(".weather-icon");

async function checkWeather(city){
    try {
        const response = await fetch(URL + city + `&appid=${apiKey}`); // Fetching weather data with API key and city name
        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "None";
        }
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if response is not ok
        }
        const data = await response.json(); // Parsing JSON response
        console.log(data); // Logging the retrieved weather data to the console

        // Updating HTML elements with weather data
        document.querySelector(".city").innerHTML = data.name; // Setting city name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Setting temperature (rounded to nearest integer)
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Setting humidity
        document.querySelector(".wind").innerHTML = data.wind.speed; // Setting wind speed

        if(data.weather[0].main == "Clouds"){
            icon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Rain"){
            icon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Clear"){
            icon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            icon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            icon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            icon.src = "images/snow.png";
        }
        else{
            icon.src = "images/clouds.png";
        }
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log any errors that occur during fetching
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Get the value from the search input and trim any whitespace
    if (city) {
        checkWeather(city); // Call checkWeather function with the provided city name
    } else {
        console.error('Please enter a city name'); // Log an error if the input field is empty
    }
});
