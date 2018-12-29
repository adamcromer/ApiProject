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
    var zipSearch = $("#zipSearch");
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
    var eventSubmit = $("#eventSubmit");
    var eventReset = $("#eventReset");
    var error = $("#error");

    //Function to show the current time
    function setCurrentTime() {
        currentTime.text(moment().format('dddd, MMMM Do, YYYY [at] h:mm:ss A'));
    }

    //Starts the time function to run every second
    emptyTimeVar = setInterval(setCurrentTime, 1000);

    //What happens when you click the submit button on map
    zipSearch.click(function (event) {
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
                    // color: '#A7D799',
                    // eventBackgroundColor: '#A7D799'
                }
            ],
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
    });
    closeEvent.click(function () {
        eventDiv.hide();
        error.hide();
    });

    function clearSubmit() {
        //Clears out the inputs
        $("#name").val("");
        $("#title").val("");
        $("#address").val("");
        $("#date").val("");
        $("#time").val("");
        $("#description").val("");
    }

    eventSubmit.click(function () {
        event.preventDefault();

        //Declare variables for the value in the inputs
        var name = $("#name").val().trim();
        var title = $("#title").val().trim();
        var address = $("#address").val().trim();
        var date = $("#date").val().trim();
        var time = $("#time").val().trim();
        var description = $("#description").val().trim();

        //Shows an error if an input is empty.
        if (name === "" || title === "" || address === "" || date === "" || time === "" || description === "") {
            error.show();
        }
        else {
            //Pushes the values to Firebase
            database.ref().push({
                name: name,
                title: title,
                address: address,
                date: date,
                time: time,
                description: description
            });

            clearSubmit();
            error.hide();
            eventDiv.hide();
        }
    });

    eventReset.click(function () {
        event.preventDefault();
        clearSubmit();
    });

    database.ref().on("child_added", function (snapshot) {

        var name = snapshot.val().name;
        var title = snapshot.val().title;
        var address = snapshot.val().address;
        var date = snapshot.val().date;
        var time = snapshot.val().time;
        var dateAndTime = moment(date + " " + time);
        console.log(dateAndTime.format());
        var description = snapshot.val().description;
        console.log(title)
        console.log(description)

        $("#calendar").fullCalendar({

            event: [
                {
                    title: title,
                    name: name,
                    start: dateAndTime,
                    address: address,
                    description: description,
                    allDay: false,
                    color: '#A7D799',
                    eventBackgroundColor: '#A7D799'

                }
            ],
        });
    });

    loadCalendar();
    

});
