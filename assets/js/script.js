const apiKey = "c2f4ea3c03d6375b941699ac5edb328c";
var cityInputEl = document.querySelector("#city-input");

function formSubmitHandler(event) {
    event.preventDefault();
}


var getWeather = function (city) {
    // get the city long/lat
    var cityLoc = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(cityLoc).then(function(response) {
        if(response.ok) {
            console.log(data);
        }
    })
    
    // var apiUrl = 
    // "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + apiKey;
    // console.log(apiUrl);
    // fetch(apiUrl).then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //         });
    //     } else {
    //         alert("Error Try again");
    //     }
    // });
};

cityInputEl.addEventListener("submit")