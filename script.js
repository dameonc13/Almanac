$(document).ready(function(e){

    var url = "https://byabbe.se/on-this-day/";
    var date = moment().format("M/D");
    var query = url + date + "/events.json";
    var fact = {
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
            console.log("data: " + data);
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


});