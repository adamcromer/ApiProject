$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBtyqihgVGOF1xetV3zTOFbgSBR17ZU4Kg",
        authDomain: "apiproject-85c1f.firebaseapp.com",
        databaseURL: "https://apiproject-85c1f.firebaseio.com",
        projectId: "apiproject-85c1f",
        storageBucket: "apiproject-85c1f.appspot.com",
        messagingSenderId: "410963970652"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    //Declaring variables equal to their HTML counterparts
    var submit = $("#submit");
    var calendar = $('#calendar');
    var currentTime = $("#currentTime");
    var emptyTimeVar;
    var next = $("#next");
    var previous = $("#previous");
    var month = $("#monthView");
    var week = $("#weekView");
    var day = $("#dayView");
    var addEvent = $("#addEvent");
    var eventDiv = $("#addNewEvent");
    var closeEvent = $("#closeEvent");

    //Function to show the current time
    function setCurrentTime() {
        currentTime.text(moment().format('dddd, MMMM Do, YYYY [at] h:mm:ss A'));
    }

    //Starts the time function to run every second
    emptyTimeVar = setInterval(setCurrentTime, 1000);

    //What happens when you click the submit button on map
    submit.click(function (event) {
        event.preventDefault();
    });

    //Loads the calendar on to the page
    function loadCalendar() {
        calendar.fullCalendar({

            events: [
                {
                    title: "Test",
                    start: "2018-12-25",
                    description: "It's Christmas apparently.",
                    color: '#A7D799',
                    eventBackgroundColor: '#A7D799'
                }


                
            ],

            eventColor: '#A7D799'
            
            // eventRender: function (event, element) {
            //     element.qTip({
            //         content: event.description
            //     });
            // }
        });
    }

    //Actions for calendar buttons
    next.click(function () {
        calendar.fullCalendar('next');
    });
    previous.click(function () {
        calendar.fullCalendar('prev');
    });
    month.click(function () {
        calendar.fullCalendar('changeView', 'month');
    });
    week.click(function () {
        calendar.fullCalendar('changeView', 'agendaWeek');
    });
    day.click(function () {
        calendar.fullCalendar('changeView', 'agendaDay');
    });
    addEvent.click(function () {

        eventDiv.show();

        database.ref().push({
            name: name,
            host: host,
            address: address,
            date: date,
            description: description
        });
    });

    closeEvent.click(function () {
        eventDiv.hide();
    });

    loadCalendar();



});
