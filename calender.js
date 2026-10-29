
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let selectedDay = 0;          

let eventDates = [];
let eventTexts = [];


function showClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();


    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    document.getElementById("time").innerHTML = `${h}:${m}:${s}`;
    document.getElementById("fullDate").innerHTML =
        `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}

showClock();
setInterval(showClock, 1000);   


function makeKey(day) {
    return year + "-" + month + "-" + day;
}


function hasEvent(key) {
    for (let i = 0; i < eventDates.length; i++) {
        if (eventDates[i] === key) {
            return true;
        }
    }
    return false;
}



function showCalendar() {
    document.getElementById("monthTitle").innerHTML = monthNames[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();          // 0 = Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();    // days in month

    let html = "";


    for (let i = 0; i < firstDay; i++) {
        html += `<div class="empty"></div>`;
    }

    
    for (let d = 1; d <= totalDays; d++) {
        let className = "day";

    
        if ((firstDay + d - 1) % 7 === 6) {
            className += " sat";
        }

    
        if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            className += " today";
        }

    
        if (d === selectedDay) {
            className += " selected";
        }

    
        let dot = "";
        if (hasEvent(makeKey(d))) {
            dot = `<span class="dot"></span>`;
        }

    
        html += `<div class="${className}" onclick="viewEvents(${d})" ondblclick="addEvent(${d})">${d}${dot}</div>`;
    }

    document.getElementById("days").innerHTML = html;
}



function viewEvents(d) {
    selectedDay = d;
    showCalendar();
    showEvents();
}

function showEvents() {
    const title = document.getElementById("panelTitle");
    const list = document.getElementById("eventList");

    if (selectedDay === 0) {
        title.innerHTML = "Select a date";
        list.innerHTML = "";
        return;
    }

    title.innerHTML = `${selectedDay} ${monthNames[month]} ${year}`;

    const key = makeKey(selectedDay);
    let html = "";

    for (let i = 0; i < eventDates.length; i++) {
        if (eventDates[i] === key) {
            html += `<li>${eventTexts[i]}</li>`;
        }
    }

    if (html === "") {
        html = "No events for this date.";
    }

    list.innerHTML = html;
}


function addEvent(d) {
    if (d === 0) {
        alert("Please select a date first.");
        return;
    }

    selectedDay = d;
    const text = prompt(`Enter event or reminder for ${d} ${monthNames[month]} ${year}:`);

    if (text !== null && text !== "") {
        eventDates.push(makeKey(d));
        eventTexts.push(text);
    }

    showCalendar();
    showEvents();
}



function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    selectedDay = 0;
    showCalendar();
    showEvents();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    selectedDay = 0;
    showCalendar();
    showEvents();
}



viewEvents(today.getDate());