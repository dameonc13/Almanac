$(document).ready(function (e) {

    /*
    * today's date
    */
    var today = moment().format("M/D");

    // onThisDay();

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


    let alertElement = $(".weather-notification");
    let weatherIcon = $(".weather-icon");
    let tempValue = $(".temperature-value");
    let tempDescription = $(".temperature-description");
    let locationElement = $(".weather-location");
    let dateElemenet = $(".date");
    let cityElement = $("#weather-city");
    let btnElement = $(".weather-btn");
    let citySearch = "";

    // //create current date using moment.js 
    var d = moment().format('LLLL');
    $(".date").append(d);
    console.log(d);

    //create api key and url links 
    let APIkey = "e1014510ebbf942b1f1d07d44fa4f59b";

    //  create onclick button to call search function 
    $(".weather-btn").on("click", function (event) {
        event.preventDefault();

        //this variable collects the user infomation from the text area
        citySearch = $("#weather-city").val().trim()
        console.log(citySearch);
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (data) {
                console.log(data);
                //set weather data to local storage 
                localStorage.setItem("cityElement", citySearch);
                localStorage.setItem("temperature", data.main.temp + "" + "º" + "F");
                // localStorage.setItem("min-temperature", data.main.temp_min);
                // localStorage.setItem("unit");
                localStorage.setItem("description", data.weather[0].description);
                localStorage.setItem("icon", data.weather[0].icon);
                localStorage.setItem("city", data.name);
                localStorage.setItem("country", data.sys.country);


            });
//display weather data result from storage to HTML page when called 

   var storedWeather = localStorage.getItem("cityElement");
    cityElement.text(storedWeather); 
    console.log(storedWeather);

    var storedTemp = localStorage.getItem("temperature");
    tempValue.text(storedTemp);

    var storedDecrip = localStorage.getItem("description");
    tempDescription.text(storedDecrip);
console.log(storedDecrip);
    var storedIcon = localStorage.getItem("icon");
    weatherIcon.text(storedIcon);

    var storedLocation = localStorage.getItem("city");
    locationElement.text(storedLocation);
  
    
    
   

    })
})












