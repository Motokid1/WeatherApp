var cityInputMobile = document.getElementById("mobileSearchCity");

cityInputMobile.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loader();

    function loader() {
      const elements = ["locationName", "temperatureValue", "weatherType"];
      elements.forEach((id) => {
        document.getElementById(id).innerHTML = "";
        const img = document.createElement("img");
        img.src = "icons/loader.gif";
        img.id = `loader-${id}`;
        document.getElementById(id).appendChild(img);
      });
    }

    var cityInputValue = cityInputMobile.value;

    var apiKey = "b1fd6e14799699504191b6bdbcadfc35"; // Default
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if (cityInputValue != "") {
      async function getWeather() {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if (data.message != "city not found" && data.cod != "404") {
          updateWeather(data);
        } else {
          showError("City Not Found");
        }
      }

      getWeather();
    } else {
      showError("Enter a city name...");
    }
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

// Function to update the current time
function updateTime() {
  var currentTime = new Date().toLocaleTimeString();
  document.getElementById("currentTime").innerHTML =
    "Current Time: " + currentTime;
}

// Initial call to display time when the page loads
updateTime();
setInterval(updateTime, 60000); // Update time every minute
