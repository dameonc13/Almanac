$(document).ready(function (e) {

    /*
    * today's date
    */
    var today = moment().format("M/D");

    /*
    * Global varibles, hold latitude and longitude for geolocation.
    * Used for obtaining local weather on load.
    */
    var lat = "",
        lon = "";

    onThisDay();

    /*
    * On this Day in History
    * Finds a fun historical event from this day and populates a tile.
    */
    function onThisDay() {
        let url = "https://byabbe.se/on-this-day/";
        let date = moment().format("M/D");
        let query = url + date + "/events.json";

        //fact object, holds relevant info for todays fact
        let fact = {
            date: "",
            year: "",
            description: "",

            wikipedia: {
                title: "",
                link: ""
            },
        }

        console.log(query);

        $.ajax({
            url: query,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            let index = Math.round(Math.random() * data.events.length);
            console.log("random: " + index);

            fact.date = data.date;
            fact.year = data.events[index].year;
            fact.description = data.events[index].description;
            fact.wikipedia.title = data.events[index].wikipedia[0].title;
            fact.wikipedia.link = data.events[index].wikipedia[1].wikipedia;

            console.log("fact: " + fact);

            $(".onThisDayTitle").html(fact.date + ", " + fact.year);
            $(".onThisDaySubtitle").html(fact.description);
            $("#wikipediaTitle").html(fact.wikipedia.title);
            $(".onThisDayContent").html("<a href=\"" + fact.wikipedia.link + "\" target=\"_blank\">Learn more</a>");
        });
    }

    /*
    * Listener which runs on click of weather button.
    * Gets weather for searched city.
    */
    $(".weather-btn").on("click", function (event) {

        let citySearch = "";
        let d = moment().format('LLLL');

        //Create api key and url links 
        let APIkey = "e1014510ebbf942b1f1d07d44fa4f59b";

        //Collect user infomation from text area of #weather-city
        citySearch = $("#weather-city").val().trim()

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIkey;

        $(".date").text(d);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {

            $(".weather-location").html(data.name);
            $(".temperature-value").text(Math.round(data.main.temp) + "º" + "F");
            $(".temperature-description").text(data.weather[0].description);
            $(".weather-icon").html("<img src=\"./Asset/" + data.weather[0].icon + ".png\" alt=\"" + data.weather[0].icon + "\"></img>");
            $(".humidity").text("Humidity: " + data.main.humidity + " %");
        });

    });

    /* 
    * Get geolocation at load after permission granted.
    */
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        weatherGeoLocation();
    })

    /*
    * Display weather info based on geolocation.
    */
    function weatherGeoLocation() {

        lat = "?lat=" + lat
        lon = "&lon=" + lon;

        let weatherApi = "https://api.openweathermap.org/data/2.5/forecast" + lat + lon + "&units=imperial&appid=" + "e1014510ebbf942b1f1d07d44fa4f59b";

        $.ajax({
            url: weatherApi,
            method: "GET"
        }).then(function (wData) {

            $(".weather-location").text(wData.city.name);
            $(".temperature-value").text(Math.round(wData.list[0].main.temp) + "º" + "F");
            $(".temperature-description").text(wData.list[0].weather[0].description);
            $(".weather-icon").html("<img src=\"./Asset/" + wData.list[0].weather[0].icon + ".png\" alt=\"" + wData.list[0].weather[0].icon + "\"></img>");
            $(".humidity").text("Humidity: " + wData.list[0].main.humidity + " %");

        })

    }

});












