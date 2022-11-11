let weather = {
  apiKey: "75e95cad7edda93c4ead6a4271fc763c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
    displayWeather: function (data) {
      
    // Get all data from API JSON Page
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;
      
    // Set innertext of class to new data variables
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = Math.round(temp) + "°F";
    document.querySelector(".temp-min").innerText =
      "L: " + Math.round(temp_min) + "°F";
    document.querySelector(".temp-max").innerText =
      "H: " + Math.round(temp_max) + "°F";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    
    // Grab Search Bar Value
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// On Button Click, search for weather and clear input box
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  document.querySelector(".search-bar").value = "";
});

// On enter, search for weather and clear input box
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      document.querySelector(".search-bar").value = "";
    }
  });

weather.fetchWeather("Virginia Beach");
