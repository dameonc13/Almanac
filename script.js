$(document).ready(function(e){

    /*
    * today's date
    */
    var today = moment().format("M/D");
    
    onThisDay();

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