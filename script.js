$(document).ready(function(e){

    /*
    * today's date
    */
    var today = moment().format("M/D");
    
    onThisDay();
    wordOfTheDay();

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

        $.ajax({
            url: query,
            method: "GET"
            }).then(function(data) {
                let index = Math.round(Math.random() * data.events.length);

                fact.date = data.date;
                fact.year = data.events[index].year;
                fact.description = data.events[index].description;
                fact.wikipedia.title = data.events[index].wikipedia[0].title;
                fact.wikipedia.link = data.events[index].wikipedia[0].wikipedia;

                $(".onThisDayTitle").html(fact.date + ", " + fact.year);
                $(".onThisDaySubtitle").html(fact.description);
                $("#wikipediaTitle").html(fact.wikipedia.title);
                $(".onThisDayContent").html("<a href=\"" + fact.wikipedia.link + "\" target=\"_blank\">Learn more</a>");
        });
    }

    /*
    * Determines random word of the day and outputs definition, etc
    */
    function wordOfTheDay(){
        let key = "?key=64670138-b960-4366-9959-b8fdc5ecef9e";
        let url = "https://dictionaryapi.com/api/v3/references/collegiate/json/";
        let wordOfDay = "School";
        let query = url + wordOfDay + key;

        $.ajax({
            url: query,
            method: "GET"
            
            }).then(function(data){

                console.log(data);
            
                let jQuery = [".wordOne", ".wordTwo", ".wordThree"];

                for (let i = 0; i < data.length && i < 3; i ++){
                    console.log("i = " + i);
                    
                    let definition = data[i].shortdef;
                    let partOfSpeech = data[i].fl;

                    $(jQuery[i]).append(partOfSpeech + "<ul class=\"wordul" + i + "\">");
                    for( let j = 0; j < definition.length; j++){
                        $(".wordul" + i).append("<li>" + definition[j] + "</li>");
                        console.log("j = " + j);
                    }
                }
                
            });
    }
});