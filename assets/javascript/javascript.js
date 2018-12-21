$(document).ready(function () {

    var submit = $("#submit");
    var calendar = $("#calendar").fullCalendar("getCalendar");
    var currentTime = $("#currentTime");
    var emptyTimeVar;

    function setCurrentTime() {
        currentTime.text(moment().format('LLLL'));
    }

    

    submit.click(function (event) {
        event.preventDefault();
    });

    function loadCalendar() {

        $("#calendar").fullCalendar({

        });


    }

    // calendar.fullCalendar({
    //     dayClick: function () {
    //         var dayDiv = $("<div>");
    //         var dayEvent = 
    //     }
    // })


    loadCalendar();

});