const apiKey = "c2f4ea3c03d6375b941699ac5edb328c";
var city = "";
var cityInputEl = document.querySelector("#city-input");
var putElement = document.querySelector("#input");
var currentWeatherEl = document.querySelector("#current-weather");
var cityDetailsEL = document.querySelector("#city-details");
var futureForecastEl = document.querySelector("#future-forecast");
var searchHistoryEl = document.querySelector("#search-history");
var savedCity = JSON.parse(localStorage.getItem(city)) || [];
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

    var tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + Math.round(data.current.temp) + " °F";
    tempEl.classList = "list-group-item";
    currentWeatherEl.appendChild(tempEl);
    console.log(data.current.temp);

    var weatherIcon = document.createElement("img")
    var icon = data.current.weather[0].icon;
    console.log(icon);
    weatherIcon.setAttribute(
        "src", 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    weatherIcon.classList = "list-group-item";
    cityDetailsEL.appendChild(weatherIcon);
    console.log(weatherIcon);

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
    uvEl.classList = "list-group-item uv";
    currentWeatherEl.appendChild(uvEl);

    forecast(data); 
};

// function to produce 5 day forecast 
function forecast (data, city) {
    for (var i = 1; i < 6; i++) {
        var forecastDay = document.createElement("div")
        forecastDay.className = ("card col-2 m-2");
        futureForecastEl.appendChild(forecastDay);
        console.log(forecastDay);

        var forecastDate = document.createElement("h4");
        forecastDate.textContent = moment(data.daily[i].dt).format("MMMM D, YYYY");
        console.log(data.daily[i].dt);
        forecastDate.classList = "card-header";
        forecastDay.appendChild(forecastDate);

        // var forecastIcon = document.createElement("img");
    
        var forecastTemp = document.createElement("p");
        forecastTemp.textContent = "Temp: " + data.daily[i].temp.max + "°F";
        forecastDate.appendChild(forecastTemp);
        console.log(data.daily[i].temp.max);

        var forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        forecastDate.appendChild(forecastWind);
        console.log(data.daily[i].wind_speed);

        var forecastHum = document.createElement("p");
        forecastHum.textContent = "Humidity: " + data.daily[i].humidity + " %";
        forecastDate.appendChild(forecastHum);
        console.log(data.daily[i].humidity);
    }
};

var savedCities = function(city) {
    var pastCities = document.createElement("li")
    searchHistoryEl.appendChild(pastCities);

    pastCities.innerHTML = "<button class='btn btn-block'> ${city} </button>"
    var userSearch = {
        citySearch: city
    };
    savedCity.push(userSearch);
    localStorage.setItem("city", JSON.stringify(userSearch));

    $(".pastCities").on("click", function() {
        localStorage.getItem($(this).text());
        
        var city = $(this)
            .text()
            .trim();
        getWeather(city);
    })
};


// listen for "get forecast click and run the above"
putElement.addEventListener("submit", formSubmitHandler);