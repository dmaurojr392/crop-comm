function getDewPoint(tempCelsius, humidityPercent) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * tempCelsius) / (b + tempCelsius)) + Math.log(humidityPercent / 100);
    return (b * alpha) / (a - alpha);
}

async function getWeather(locationKey, displayName) {
    try {
        const response = await fetch(`http://${developmentEnvironment}:8000/weather/${locationKey}`);
        if (!response.ok) throw new Error(`Weather request failed for ${displayName}`);

        const data = await response.json();
        const { temp, humidity, feels_like, pressure } = data.main;
        const { speed } = data.wind;
        const visibility = data.visibility;
        const { icon, description } = data.weather[0];

        console.log(`Weather in ${displayName}:`, data);

        document.getElementById("temp").innerText = `${temp}°C`;
        document.getElementById("weather-desc").innerText = description.toUpperCase();
        document.getElementById("weather-humidity").innerText = `${humidity}%`;
        document.getElementById("weather-wind").innerText = `${speed} m/s`;
        document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById("weather-feels-like").innerText = `${feels_like}°C`;
        document.getElementById("weather-pressure").innerText = `${pressure} hPa`;
        document.getElementById("weather-visibility").innerText = `${(visibility / 1000).toFixed(1)} km`;

        const dewPoint = getDewPoint(temp, humidity);
        document.getElementById("weather-dew-point").innerText = `${dewPoint.toFixed(2)}°C`;

    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}

function updateWeather() {
    const location = localStorage.getItem("filter-location");

    switch (location) {
        case "Nueva-Ecija":
            getWeather("nueva-ecija", "Nueva Ecija");
            break;
        case "Aurora":
            getWeather("aurora", "Aurora");
            break;
        case "Bataan":
            getWeather("bataan", "Bataan");
            break;
        case "Bulacan":
            getWeather("bulacan", "Bulacan");
            break;
        case "Pampanga":
            getWeather("pampanga", "Pampanga");
            break;
        case "Tarlac":
            getWeather("tarlac", "Tarlac");
            break;
        case "Zambales":
            getWeather("zambales", "Zambales");
            break;
        case "Select":
        default:
            getWeather("region-3", "Central Luzon");
            break;
    }
}
