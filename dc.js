let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = $("#monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    $("#calendar-body").empty()
    if (currentMonth === 11){
    currentYear =   currentYear + 1}
    else {
        currentYear = currentYear

    }
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    $("#calendar-body").empty()

    if (currentMonth === 0){
    currentYear =  currentYear - 1  ;}
    else {
        currentYear = currentYear
     }
     if (currentMonth === 0) {
        currentMonth = 11  }
        else {
            currentMonth =   currentMonth - 1;
        }
    showCalendar(currentMonth, currentYear);
}

function jump() {
     $("#calendar-body").empty()
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
    
    
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = $("#calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = $("<tr>");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = $("<td>");
                let cellText = document.createTextNode("");
                cell.append(cellText);
                row.append(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = $("<td>");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.addClass("bg-info");
                } // color today's date
                cell.append(cellText);
                row.append(cell);
                date++;
            }


        }

        tbl.append(row); // appending each row into calendar body.
    }

}