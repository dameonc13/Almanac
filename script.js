$(document).ready(function(e){

    /*
    * today's date
    */
    var today = moment().format("M/D");
    
    //onThisDay();
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
                fact.wikipedia.link = data.events[index].wikipedia[0].wikipedia;

                console.log("fact: " + fact);

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
        let wordOfDay = "school";
        let query = url + wordOfDay + key;

        //object which stores each word
        let word = {
            title: "",
            definition: [],
            partOfSpeech: "",
        }
        
        //create new word instances
        wordOne = Object.assign(word);
        wordTwo = Object.assign(word);
        wordThree = Object.assign(word);

        //array of words, to house word objects (as defined above)
        //house up to three objects?
        let wordArray = [];

        $.ajax({
            url: query,
            method: "GET"
            
            }).then(function(data){
                
                //assign values in words
                wordOne.title = wordOfDay;
                wordOne.definition = data[0].shortdef;
                wordOne.partOfSpeech = data[0].fl;

                wordTwo.title = wordOfDay;
                wordTwo.definition = data[1].shortdef;
                wordTwo.partOfSpeech = data[1].fl;

                wordThree.title = wordOfDay;
                wordThree.definition = data[2].shortdef;
                wordThree.partOfSpeech = data[2].fl;
                
                //push to word array
                wordArray.push(wordOne);
                wordArray.push(wordTwo);
                wordArray.push(wordThree);

                console.log(wordArray);
            });
        
    }
});