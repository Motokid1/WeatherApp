var cityInput = document.getElementById("searchCity");

var backgroundsList = [
  "day1.jpg",
  "day2.jpg",
  "day3.jpg",
  "day4.jpg",
  "day5.jpg",

  "cloudy1.jpg",
  "cloudy2.jpg",
  "cloudy3.jpg",
  "cloudy4.jpg",
  "cloudy5.jpg",
];

var randomBackground =
  backgroundsList[Math.floor(Math.random() * backgroundsList.length)];

document.body.style.background =
  "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('media/" +
  randomBackground +
  "')";

cityInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loader();
    function loader() {
      document.getElementById("locationName").innerHTML = "";
      document.getElementById("temperatureValue").innerHTML = "";
      document.getElementById("weatherType").innerHTML = "";

      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      const img3 = document.createElement("img");

      img1.id = "loader1";
      img2.id = "loader2";
      img3.id = "loader3";

      img1.src = "icons/loader.gif";
      img2.src = "icons/loader.gif";
      img3.src = "icons/loader.gif";

      const parentElement1 = document.getElementById("locationName");
      const parentElement2 = document.getElementById("temperatureValue");
      const parentElement3 = document.getElementById("weatherType");

      parentElement1.appendChild(img1);
      parentElement2.appendChild(img2);
      parentElement3.appendChild(img3);
    }

    var cityInputValue = cityInput.value;

    var apiKey = "b1fd6e14799699504191b6bdbcadfc35"; // Default
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if (cityInputValue != "") {
      async function getWeather() {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if (data.message != "city not found" && data.cod != "404") {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
          var realFeel = data.main.feels_like;
          var windSpeed = data.wind.speed;
          var windDirection = data.wind.deg;
          var visibility = data.visibility / 1000;
          var pressure = data.main.pressure;
          var maxTemperature = data.main.temp_max;
          var minTemperature = data.main.temp_min;
          var humidity = data.main.humidity;
          var sunrise = data.sys.sunrise;
          var sunset = data.sys.sunset;

          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML =
            temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType;
          document.getElementById("realFeelAdditionalValue").innerHTML =
            realFeel + "<sup>o</sup>C";
          document.getElementById("windSpeedAdditionalValue").innerHTML =
            windSpeed + " km/h";
          document.getElementById("windDirectionAdditionalValue").innerHTML =
            windDirection;
          document.getElementById("visibilityAdditionalValue").innerHTML =
            visibility + " km";
          document.getElementById("pressureAdditionalValue").innerHTML =
            pressure;
          document.getElementById("maxTemperatureAdditionalValue").innerHTML =
            maxTemperature + "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML =
            minTemperature + "<sup>o</sup>C";
          document.getElementById("humidityAdditionalValue").innerHTML =
            humidity;
          document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
          document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
        } else {
          document.getElementById("locationName").innerHTML = "City Not Found";
          document.getElementById("temperatureValue").innerHTML = "";
          document.getElementById("weatherType").innerHTML = "";
        }
      }

      getWeather();
    } else
      document.getElementById("locationName").innerHTML =
        "Enter a city name...";
  }
});
// Function to update weather data on the UI
function updateWeather(data) {
  var location = data.name;
  var temperature = data.main.temp;
  var weatherType = data.weather[0].description;
  var realFeel = data.main.feels_like;
  var windSpeed = data.wind.speed;
  var windDirection = data.wind.deg;
  var visibility = data.visibility / 1000;
  var pressure = data.main.pressure;
  var maxTemperature = data.main.temp_max;
  var minTemperature = data.main.temp_min;
  var humidity = data.main.humidity;
  var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  document.getElementById("locationName").innerHTML = location;
  document.getElementById("temperatureValue").innerHTML =
    temperature + "<sup>o</sup>C";
  document.getElementById("weatherType").innerHTML = weatherType;
  document.getElementById("realFeelAdditionalValue").innerHTML =
    realFeel + "<sup>o</sup>C";
  document.getElementById("windSpeedAdditionalValue").innerHTML =
    windSpeed + " km/h";
  document.getElementById("windDirectionAdditionalValue").innerHTML =
    windDirection;
  document.getElementById("visibilityAdditionalValue").innerHTML =
    visibility + " km";
  document.getElementById("pressureAdditionalValue").innerHTML = pressure;
  document.getElementById("maxTemperatureAdditionalValue").innerHTML =
    maxTemperature + "<sup>o</sup>C";
  document.getElementById("minTemperatureAdditionalValue").innerHTML =
    minTemperature + "<sup>o</sup>C";
  document.getElementById("humidityAdditionalValue").innerHTML = humidity;
  document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
  document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
}

// Function to show error message
function showError(message) {
  document.getElementById("locationName").innerHTML = message;
  document.getElementById("temperatureValue").innerHTML = "";
  document.getElementById("weatherType").innerHTML = "";
  document.getElementById("latitude").innerHTML = "";
  document.getElementById("longitude").innerHTML = "";
}

// Function to get user's current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Display latitude and longitude
        document.getElementById("latitude").innerHTML =
          "Latitude: " + latitude.toFixed(2);
        document.getElementById("longitude").innerHTML =
          "Longitude: " + longitude.toFixed(2);

        getWeatherByLocation(latitude, longitude);
        updateTime();
      },
      function (error) {
        console.error("Error getting location:", error);
        showError("Location access denied or not available");
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser");
    showError("Geolocation is not supported by this browser");
  }
}

// Function to get weather by geolocation
function getWeatherByLocation(latitude, longitude) {
  var apiKey = "b1fd6e14799699504191b6bdbcadfc35";
  var unit = "metric";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  async function fetchWeather() {
    try {
      var response = await fetch(apiUrl);
      var data = await response.json();
      if (data.cod === 200) {
        updateWeather(data);
      } else {
        showError("Weather data not available for your location");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showError("An error occurred, please try again later");
    }
  }

  fetchWeather();
}

// Function to get weather by city name
function getWeatherByCity(cityName) {
  var apiKey = "b1fd6e14799699504191b6bdbcadfc35";
  var unit = "metric";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  async function fetchWeather() {
    try {
      var response = await fetch(apiUrl);
      var data = await response.json();
      if (data.cod === 200) {
        updateWeather(data);
        updateTime();
        // Clear latitude and longitude when searching by city name
        document.getElementById("latitude").innerHTML = "";
        document.getElementById("longitude").innerHTML = "";
      } else {
        showError("City not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showError("An error occurred, please try again later");
    }
  }

  fetchWeather();
}

// Function to update the current time
function updateTime() {
  var currentTime = new Date().toLocaleTimeString();
  document.getElementById("currentTime").innerHTML =
    "Current Time: " + currentTime;
}

// Event listener for city input search
cityInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    var cityName = cityInput.value.trim();
    if (cityName !== "") {
      getWeatherByCity(cityName);
    } else {
      showError("Please enter a city name");
    }
  }
});

// Initial call to display time when the page loads
updateTime();
setInterval(updateTime, 60000); // Update time every minute
