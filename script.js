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
 // API key
 var APIKey = "8cbd36d7b28e470b90b2709797dceca2";
 //var todayDate = moment().format();

 // url to query
 var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + APIKey;

 var articles = [
   {
     title: "",
     url: "",
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

 
 // Here we run our AJAX call to the NYTimes API
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
     //console.log(todayDate);
    
     for (i=0; i < articles.length; i ++){
       articles[i].title = response.articles[i].title;
       articles[i].url = response.articles[i].url;
        console.log(articles[i].url);
     }

     $(".newstitle1").html(articles[0].title);
     $("#newslink1").html('<a href=" '+ articles[0].url +'" target="_blank">Read Article</a>');
     $(".newstitle2").text(articles[1].title);
     $("#newslink2").html('<a href=" '+ articles[1].url +'" target="_blank">Read Article</a>');
     $(".newstitle3").text(articles[2].title);
     $("#newslink3").html('<a href=" '+ articles[2].url +'" target="_blank">Read Article</a>');
     $(".newstitle4").text(articles[3].title);
     $("#newslink4").html('<a href=" '+ articles[3].url +'" target="_blank">Read Article</a>');
     $(".newstitle5").text(articles[4].title);
     $("#newslink5").html('<a href=" '+ articles[4].url +'" target="_blank">Read Article</a>');
     

     

     });
}


