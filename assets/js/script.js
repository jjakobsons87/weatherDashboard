const apiKey = "c2f4ea3c03d6375b941699ac5edb328c";
var cityInputEl = document.querySelector("#city-input");
var putElement = document.querySelector("#input");
var currentWeatherEl = document.querySelector("#current-weather");
var cityDetailsEL = document.querySelector("#city-details");
// var currentDate = document.getElementById("#current-date");
// var currentTemp = document.querySelector("#current-temp");
// var currentWind = document.querySelector("#current-wind");
// var currentHum = document.querySelector("#current-hum");
// var currentUV = document.querySelector("#current-uv");

function formSubmitHandler(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    console.log(city);
    getWeather(city);
    cityInputEl.value = "";
};


var getWeather = function (city) {
    // get the city long/lat
    var cityLoc =
        "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(cityLoc).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //  pull out and define the lon/lat for the city
                var lat = data[0].lat;
                var lon = data[0].lon;
                
                // now take lon/lat and get full forecast 
                var apiUrl = 
                "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;
                console.log(apiUrl);
                fetch(apiUrl).then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            displayWeather(data, city);
                        });
                    } else {
                        alert("Error: Please Try again");
                    }
                });
            })
        }
    })
};

// once we get the data, fill in the page
function displayWeather (data, city) {
  // currentWeatherEl.textContent = "";
    cityDetailsEL.textContent = city;

    var currentDate = document.createElement("span");
    currentDate.textContent =
        ": " + moment(data.current.dt.value).format("MMM D, YYYY");
    cityDetailsEL.appendChild(currentDate);

    var weatherIcon = document.createElement("img")
    var icon = data.current.weather[0].icon;
    console.log(icon);
    weatherIcon.setAttribute(
        "src", 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    cityInputEl.appendChild(weatherIcon);
    console.log(weatherIcon);

    var tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + Math.round(data.current.temp) + " °F";
    tempEl.classList = "list-group-item";
    currentWeatherEl.appendChild(tempEl);
    console.log(data.current.temp);

    var humEl = document.createElement("span");
    humEl.textContent = "Humidity: " + data.current.humidity + "%";
    humEl.classList = "list-group-item";
    currentWeatherEl.appendChild(humEl);

    var windEl = document.createElement("span");
    windEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    windEl.classList = "list-group-item";
    currentWeatherEl.appendChild(windEl);

    var uvEl = document.createElement("span");
    uvEl.textContent = "UV: " + data.current.uvi;
    uvEl.classList = "list-group-item";
    currentWeatherEl.appendChild(uvEl);
};


// listen for "get forecast click and run the above"
putElement.addEventListener("submit", formSubmitHandler);