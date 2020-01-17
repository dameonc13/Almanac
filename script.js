$(document).ready(function (e) {

    /*
    * Today's date
    */

    var today = moment().format("M/D");

    /*
    * Global varibles, hold latitude and longitude for geolocation.
    * Used for obtaining local weather on load.
    */
    var lat = "",
        lon = "";


    let today = moment().format("M/D");
  
    onThisDay();
    news();
    wordOfTheDay();

    /*
    * On this Day in History
    * Finds a fun historical event from this day and populates a tile.
    */
    function onThisDay(){
        let url = "https://byabbe.se/on-this-day/",
            query = url + today + "/events.json";


        $.ajax({
            url: query,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            let index = Math.round(Math.random() * data.events.length);

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

    /*
    * Function to GET data from NewsAPI and display on the html page.
    */
    function news() {
        // API key
        let APIKey = "8cbd36d7b28e470b90b2709797dceca2";

        // url to query API
        let queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + APIKey;

        // Here we run our AJAX call to the NewsAPI
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (let i = 0; i < response.articles.length || i < 5; i++) {
                $(".newstitle" + (i + 1)).html(response.articles[i].title);
                $(".newslink" + (i + 1)).html("<a href=" + response.articles[i].url + " target=\"_blank\">Read Article</a>");
            }

        });
    }

    /*
    * Determines random word of the day and outputs definition(s) & part(s) of speech (adj, noun, etc).
    */
    function wordOfTheDay() {
        let key = "?key=64670138-b960-4366-9959-b8fdc5ecef9e",
            url = "https://dictionaryapi.com/api/v3/references/collegiate/json/";

        //get the saved randomIndex
        let randomIndex = localStorage.getItem("wordIndex");

        //if no date stored in localStorage, or if it is a new day...
        if ((localStorage.getItem("today") == null) || (localStorage.getItem("today") != today)) {
            localStorage.setItem("today", today); //... Then, set today in localStorage...
            randomIndex = Math.floor((Math.random() * dictionary.length) + 1); //... Next, calculate new number...
            localStorage.setItem("wordIndex", randomIndex); //... Finally, save index into localStorage.
        }

        //if index is null, generate new random number and save to local storage
        if (randomIndex === null) {
            randomIndex = Math.floor((Math.random() * dictionary.length) + 1);
            localStorage.setItem("wordIndex", randomIndex);
        }

        //get word of day based on dictionary in wordOfDay.js
        let wordOfDay = dictionary[randomIndex];

        //build query
        let query = url + wordOfDay + key;

        $.ajax({
            url: query,
            method: "GET"

        }).then(function (data) {

            $(".word").html(toUpper(wordOfDay));

            //3 definitions, saved class names for easier calling later
            let jQuery = [".wordOne", ".wordTwo", ".wordThree"];

            //get the first three definitions of a word, if less than three defs for a word: STOP!
            for (let i = 0; i < data.length && i < 3; i++) {

                let definition = data[i].shortdef,
                    partOfSpeech = data[i].fl;

                //update HTML with word, definition, & part of speech
                $(jQuery[i]).append("<p style=\"font-style: italic;\">" + partOfSpeech + "<ul class=\"wordUL" + i + "\" >");
                for (let j = 0; j < definition.length; j++) {
                    $(".wordUL" + i).append("<li>" + toUpper(definition[j]) + "</li>");
                }
            }
        });
    }

    /*
    * Takes a string argument and returns the same string with first letter capitalized.
    * Small helper function used for printing word of day and definition onto screen.
    */
    function toUpper(input) {
        let newString = input.charAt(0).toUpperCase() + input.substring(1);
        return newString;
    }
});
