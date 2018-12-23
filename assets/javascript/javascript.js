$(document).ready(function () {

    var submit = $("#submit");
    var calendar = $('#calendar');
    var currentTime = $("#currentTime");
    var emptyTimeVar;
    var next = $("#next");
    var previous = $("#previous");
    var month = $("#monthView");
    var week = $("#weekView");
    var day = $("#dayView");

    //Function to show the current time
    function setCurrentTime() {
        currentTime.text(moment().format('dddd, MMMM Do, YYYY [at] h:mm:ss A'));
    }
    //Starts the time function to run every second
    emptyTimeVar = setInterval(setCurrentTime, 1000);

    submit.click(function (event) {
        event.preventDefault();
    });

    function loadCalendar() {
        calendar.fullCalendar({
        });
    }

    next.click(function() {
        calendar.fullCalendar('next');
    });

    previous.click(function() {
        calendar.fullCalendar('prev');
    });

    month.click(function() {
        calendar.fullCalendar();
    });

    week.click(function() {
        calendar.fullCalendar('changeView', 'agendaWeek');
    });

    day.click(function() {
        calendar.fullCalendar('changeView', 'agendaDay');
    });
    loadCalendar();

});