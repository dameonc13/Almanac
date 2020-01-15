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

        $.ajax({
            url: query,
            method: "GET"
            }).then(function(data) {
                //holds index for api object
                let index = Math.round(Math.random() * data.events.length);
                console.log("onthisDay Index = " + index)

                //add to html
                $(".onThisDayTitle").html(data.date + ", " + data.events[index].year);
                $(".onThisDaySubtitle").html(data.events[index].description);
                $("#wikipediaTitle").html(data.events[index].wikipedia[0].title);
                $(".onThisDayContent").html("<a href=\"" + data.events[index].wikipedia[0].wikipedia + "\" target=\"_blank\">Learn more</a>");
        });
    }

    /*
    * Determines random word of the day and outputs definition, etc
    */
    function wordOfTheDay(){
        let key = "?key=64670138-b960-4366-9959-b8fdc5ecef9e";
        let url = "https://dictionaryapi.com/api/v3/references/collegiate/json/";

        let randomIndex = Math.floor((Math.random() * dictionary.length) + 1);
        console.log("word of day index = " + randomIndex)
        let wordOfDay = dictionary[randomIndex];

        let query = url + wordOfDay + key;

        $.ajax({
            url: query,
            method: "GET"
            
            }).then(function(data){

                console.log(data);
                $(".word").html(wordOfDay);
            
                let jQuery = [".wordOne", ".wordTwo", ".wordThree"];

                for (let i = 0; i < data.length && i < 3; i ++){
                    
                    let definition = data[i].shortdef;
                    let partOfSpeech = data[i].fl;

                    $(jQuery[i]).append(partOfSpeech + "<ul class=\"wordul" + i + "\">");
                    for( let j = 0; j < definition.length; j++){
                        $(".wordul" + i).append("<li>" + definition[j] + "</li>");
                    }
                }
                
            });
    }
});