const startWeek = moment().startOf('year').month();
const endWeek = moment().endOf('year').month();


let calendar = []
for (var week = startWeek; week < endWeek; week++) {
    calendar.push({
        week, 
        days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
    })
}
for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[1].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<div>").html(day);
    data.addClass("col-sm")
    $(".week1").append(data)
    //var days = dayz.substring(2, 4);

   
}

for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[2].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<div>").html(day);
    data.addClass("col-sm")
    $(".week2").append(data)
    //var days = dayz.substring(2, 4);

  
}

for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[3].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<div>").html(day);
    data.addClass("col-sm")
    $(".week3").append(data)
    //var days = dayz.substring(2, 4);

   
}

for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[4].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<div>").html(day);
    data.addClass("col-sm")
    $(".week4").append(data)
    //var days = dayz.substring(2, 4);

   
}

for (i = 0; i < calendar[0].days.length; i++) {
    var dayz = JSON.stringify(calendar[5].days[i]._d)
    var day = dayz.substring(9, 11);
    var data = $("<div>").html(day);
    data.addClass("col-sm")
    $(".week5").append(data)
    //var days = dayz.substring(2, 4);

   
} 
console.log(calendar);