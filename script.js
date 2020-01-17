$(document).ready(function(e){

    /*
    * Today's date
    */
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

            }).then(function(data) {
                
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
  * Function to GET data from NewsAPI and display on the html page.
  */
  function news(){  
  // API key
    let APIKey = "8cbd36d7b28e470b90b2709797dceca2";
    
    // url to query API
    let queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + APIKey;

    // Here we run our AJAX call to the NewsAPI
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      for (let i = 0; i < response.articles.length || i < 5; i++) {
        $(".newstitle" + (i + 1)).html(response.articles[i].title);
        $(".newslink" + (i + 1)).html("<a href=" + response.articles[i].url + " target=\"_blank\">Read Article</a>");
      }

      });
    }

});

    /*
    * Determines random word of the day and outputs definition(s) & part(s) of speech (adj, noun, etc).
    */
    function wordOfTheDay(){
        let key = "?key=64670138-b960-4366-9959-b8fdc5ecef9e",
            url = "https://dictionaryapi.com/api/v3/references/collegiate/json/";

        //get the saved randomIndex
        let randomIndex = localStorage.getItem("wordIndex");

        //if no date stored in localStorage, or if it is a new day...
        if((localStorage.getItem("today") == null) || (localStorage.getItem("today") != today)){
            localStorage.setItem("today", today); //... Then, set today in localStorage...
            randomIndex = Math.floor((Math.random() * dictionary.length) + 1); //... Next, calculate new number...
            localStorage.setItem("wordIndex", randomIndex); //... Finally, save index into localStorage.
        }

        //if index is null, generate new random number and save to local storage
        if(randomIndex === null){
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
            
            }).then(function(data){

                $(".word").html(toUpper(wordOfDay));
            
                //3 definitions, saved class names for easier calling later
                let jQuery = [".wordOne", ".wordTwo", ".wordThree"];

                //get the first three definitions of a word, if less than three defs for a word: STOP!
                for (let i = 0; i < data.length && i < 3; i ++){
                    
                    let definition = data[i].shortdef,
                        partOfSpeech = data[i].fl;

                    //update HTML with word, definition, & part of speech
                    $(jQuery[i]).append("<p style=\"font-style: italic;\">" + partOfSpeech + "<ul class=\"wordUL" + i + "\" >");
                    for (let j = 0; j < definition.length; j++){
                        $(".wordUL" + i).append("<li>" + toUpper(definition[j]) + "</li>");
                    }
                } 
            });
    }
    
    /*
    * Takes a string argument and returns the same string with first letter capitalized.
    * Small helper function used for printing word of day and definition onto screen.
    */
    function toUpper(input){
        let newString = input.charAt(0).toUpperCase() + input.substring(1);
        return newString;
    }
});

