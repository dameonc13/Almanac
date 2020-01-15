const startWeek = moment().startOf('year').month();
const endWeek = moment().endOf('year').month();
var currentMonth = moment().format("MMMM");
$(".month").text(currentMonth)




//appends to  calender the first 11 weeks of the year
let calendar = []
for (var week = startWeek; week < endWeek; week++) {
    calendar.push({
        week, 
        days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
    })
}

//for loop extracts from calender array the first week and appends to week1 class
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[1].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<button>").text(day);
    data.addClass("is-child notification is-info tile buttons")
    data.attr("data-name", day)
    localStorage.setItem(day, data.attr("data-name") );
    $(".week1").append(data)
    //var days = dayz.substring(2, 4);

   
}
//for loop extracts from calender array the second week and appends to week2 class
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[2].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<button>").html(day);
    data.addClass("is-child notification is-info tile buttons")
    data.attr("data-name", day)
    localStorage.setItem(day, data.attr("data-name") );
    $(".week2").append(data)
    //var days = dayz.substring(2, 4);

  
}

//for loop extracts from calender array the third week and appends to week3 class
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[3].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<button>").html(day);
    data.addClass("is-child notification is-info tile buttons")
    data.attr("data-name", day)
    localStorage.setItem(day, data.attr("data-name") );
    $(".week3").append(data)
    //var days = dayz.substring(2, 4);

   
}

//for loop extracts from calender array the fourth week and appends to week4 class
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[4].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<button>").html(day);
    data.addClass("is-child notification is-info tile buttons")
    data.attr("data-name", day)
    localStorage.setItem(day, data.attr("data-name") );
    $(".week4").append(data)
    //var days = dayz.substring(2, 4);

   
}


//for loop extracts from calender array the fifth week and appends to week5 class
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[5].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<button>").html(day);
    data.addClass("is-child notification is-info tile buttons")
    data.attr("data-name", day)
    localStorage.setItem(day, data.attr("data-name") );
    $(".week5").append(data)
    //var days = dayz.substring(2, 4);

   
} 



// Get the modal
var modal = $("#myModal")

// Get the button that opens the modal
var btn = $("button")

// Get the <span> element that closes the modal
var span = $(".close")

// When the user clicks the button, open the modal 
$("button").on("click", function(event)  {
  $(modal).show();
})

// When the user clicks on <span> (x), close the modal
$("span").on("click", function(event)  {

    
  $(modal).hide();
})

// When the user clicks anywhere outside of the modal, close it
/*(window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}) */


