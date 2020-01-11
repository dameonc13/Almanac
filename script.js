$(document).ready(function(e){

    /*
    * today's date
    */
    var today = moment().format("M/D");
    
    onThisDay();
    news();

    /*
    * On this Day in History
    * Finds a fun historical event from this day and populates a tile.
    */
    function onThisDay(){
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
            }).then(function(data) {
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
});



///////////////////////////////////////////////////////
//p=pauls playground

function news(){
 // This is our API key
 var APIKey = "Aw4YgVC7dO9qpiArPu0fvwznQjb15ut7";

 // Here we are building the URL we need to query the database
 var queryURL = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + APIKey;

 var articles = [
   {
     title: "",
     url: ""
   },
   {
     title: "",
     url: ""
   },
   {
     title: "",
     url: ""
   },
   {
     title: "",
     url: ""
   },
   {
     title: "",
     url: ""
   }
 ];

 
 // Here we run our AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   // We store all of the retrieved data inside of an object called "response"
   .then(function(response) {

     // Log the queryURL
     console.log(queryURL);

     // Log the resulting object
     console.log(response)
     //articles[0].title = response.results[0].title;
     //articles[0].url = response.results[0].url;
     //article[1].title = response.results[1].title;
     //article[1].url = response.results[1].url;
     //article[2].title = respone.results[2].title;
     //articles[2].url = response.results[2].url;

     for (i=0; i < articles.length; i ++){
       articles[i].title = response.results[i].title;
       articles[i].url = response.results[i].url;
        console.log(articles[i]);
     }

     $(".newstitle1").text(articles[0].title);
     $(".newsurl1").text(articles[0].url);
     $(".newstitle2").text(articles[1].title);
     $(".newsurl2").text(articles[1].url);
     $(".newstitle3").text(articles[2].title);
     $(".newsurl3").text(articles[2].url);
     $(".newstitle4").text(articles[3].title);
     $(".newsurl4").text(articles[3].url);
     $(".newstitle5").text(articles[4].title);
     $(".newsurl5").text(articles[4].url);
     

     

     // Transfer content to HTML
     //$(".first").text(response.results[1]);
     //$(".wind").text("Wind Speed: " + response.wind.speed);
     //$(".humidity").text("Humidity: " + response.main.humidity);
     //$(".temp").text("Temperature (F) " + response.main.temp);

     // Converts the temp to Kelvin with the below formula
    // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
     //$(".tempF").text("Temperature (Kelvin) " + tempF);

     // Log the data in the console as well
     //console.log(response.results[0]);
     //console.log(JSON.stringify(response.results[2]));
     //console.log("Temperature (F): " + response.main.temp);
   });
}


