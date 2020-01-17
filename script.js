$(document).ready(function (e) {

    /*
    * Today's date in moment() format
    */
    var today = moment().format("M/D");

    /*
    * Today's date in Date() format
    */
    var todayDate = new Date();

    /*
    * Global varibles, hold latitude and longitude for geolocation.
    * Used for obtaining local weather on load.
    */
    var lat = "",
        lon = "";

    /*
    * Global array of strings, holds instances on each month
    */
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /*
    * Global instance of the current month as Date Object.
    * Global instance of current year as Date object.
    */
    var currentMonth = todayDate.getMonth(),
        currentYear = todayDate.getFullYear();

    showCalendar(currentMonth, currentYear);
    onThisDay();
    news();
    wordOfTheDay();

    /*
    * On this Day in History
    * Finds a fun historical event from this day and populates a tile.
    */
    function onThisDay() {
        let url = "https://byabbe.se/on-this-day/",
            query = url + today + "/events.json";

        $.ajax({
            url: query,
            method: "GET"

        }).then(function (data) {

            //holds index for api object
            let index = Math.floor(Math.random() * data.events.length);

            //add to html
            $(".onThisDayTitle").html(data.date + ", " + data.events[index].year);
            $(".onThisDaySubtitle").html(data.events[index].description);
            $("#wikipediaTitle").html(data.events[index].wikipedia[0].title);
            $(".onThisDayContent").html("<a href=\"" + data.events[index].wikipedia[0].wikipedia + "\" target=\"_blank\">Learn more</a>");
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
    });

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
        });
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

            for (let i = 0; i < response.articles.length && i < 8; i++) {
                $(".newsContent").append("<p class=\"subtitle newstitle" + (i + 1) + "\"></p>");
                $(".newsContent").append("<p class=\"newslink" + (i + 1) + "\"></p>");
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

    function next() {
        $("#calendar-body").empty()
        if (currentMonth === 11) {
            currentYear = currentYear + 1
        }
        else {
            currentYear = currentYear

        }
        currentMonth = (currentMonth + 1) % 12;
        showCalendar(currentMonth, currentYear);
    }

    function previous() {
        $("#calendar-body").empty()

        if (currentMonth === 0) {
            currentYear = currentYear - 1;
        }
        else {
            currentYear = currentYear
        }
        if (currentMonth === 0) {
            currentMonth = 11
        }
        else {
            currentMonth = currentMonth - 1;
        }
        showCalendar(currentMonth, currentYear);
    }

    function jump() {
        $("#calendar-body").empty()
        currentYear = parseInt(selectYear.value);
        currentMonth = parseInt(selectMonth.value);
        showCalendar(currentMonth, currentYear);
    }

    function showCalendar(month, year) {

        let monthAndYear = $("#monthAndYear");
        let firstDay = (new Date(year, month)).getDay();
        let selectYear = document.getElementById("year");
        let selectMonth = document.getElementById("month");

        //body of the calendar
        tbl = document.getElementById("calendar-body");

        //clear previous cells
        tbl.innerHTML = "";

        //populate month data
        monthAndYear.html(months[month] + " " + year);
        selectYear.value = year;
        selectMonth.value = month;

        //create all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            //create a table row
            let row = document.createElement("tr");

            //create individual cells, populate with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth(month, year)) {
                    break;
                }

                else {
                    cell = document.createElement("td");
                    cellText = document.createTextNode(date);
                    if (date === todayDate.getDate() && year === todayDate.getFullYear() && month === todayDate.getMonth()) {
                        cell.classList.add("bg-info");
                    }
                    //highlight today's date
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }
            //appending each row into calendar body.
            tbl.append(row);
        }
    }

    /*
    * Helper function determines how many days in a month.
    * @arg: month: holds value of the month to determine how many days
    * @arg: year: holds value of the year to determine how many days. This only actually matters for February in leap years.
    */
    function daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
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