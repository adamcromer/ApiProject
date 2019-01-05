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
    var currentTime = $("#currentTime");
    var emptyTimeVar;
    var calendar = $('#calendar');
    var fullCalCont = $("#fullCalCont")
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
    var calendarCont = $("#calendarCont");
    var emptyCalVar;
    var eventInfo = $("#eventInfo");
    var welcomeNav = $("#welcomeNav");
    var mapNav = $("#mapNav");
    var calendarNav = $("#calendarNav")
    var aboutNav = $("#aboutNav");
    var hasEventBeenClicked = false;

    welcomeNav.click(function () {
        welcome.scrollIntoView({
            behavior: "smooth"
        });
    });
    mapNav.click(function () {
        map.scrollIntoView({
            behavior: "smooth"
        });
    });
    calendarNav.click(function () {
        calRow.scrollIntoView({
            behavior: "smooth"
        });
    });
    aboutNav.click(function () {
        about.scrollIntoView({
            behavior: "smooth"
        });
    });

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
        eventDiv.toggle("drop", { direction: "left" }, "slow");
    });
    closeEvent.click(function () {
        eventDiv.hide("drop", { direction: "left" }, "slow");
        error.hide();
        clearSubmit();
    });
    eventDiv.draggable();

    //Clears out the inputs
    function clearSubmit() {
        $("#nameInput").val("");
        $("#titleInput").val("");
        $("#addressInput").val("");
        $("#dateInput").val("");
        $("#timeInput").val("");
        $("#descriptionInput").val("");
    }

    //Function to show eventInfo.
    function shrinkCal() {
        fullCalCont.toggle("drop", { direction: "right" }, "slow");
        eventInfo.toggle();
    }

    // This minimizes the calendar and shows the event info on the side.
    function showEventInfo() {

        if (hasEventBeenClicked === false) {
            fullCalCont.toggle("drop", { direction: "left" }, "slow");
            calendarCont.toggleClass("smallCal", 500);
            emptyCalVar = setTimeout(shrinkCal, 500);
            hasEventBeenClicked = true;
        }
    }

    eventSubmit.click(function () {
        event.preventDefault();

        //Declare variables for the value in the inputs
        var name = $("#nameInput").val().trim();
        var title = $("#titleInput").val().trim();
        var address = $("#addressInput").val().trim();
        var date = $("#dateInput").val().trim();
        var time = $("#timeInput").val().trim();
        var description = $("#descriptionInput").val().trim();

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
                start: date,
                end: date,
                time: time,
                description: description
            });

            clearSubmit();
            error.hide();
            eventDiv.hide("drop", { direction: "right" }, "slow");
        }
    });

    eventReset.click(function () {
        event.preventDefault();
        clearSubmit();
    });

    database.ref().on("child_added", function (snapshot) {

        data = snapshot.val();
        var name = snapshot.val().name;
        var title = snapshot.val().title;
        var address = snapshot.val().address;
        var date = snapshot.val().date;
        var time = snapshot.val().time;
        var dateAndTime = moment(date + " " + time);
        // console.log(dateAndTime.format());
        var description = snapshot.val().description;
        // console.log(title);
        // console.log(description);

        calendar.fullCalendar({

            events: [
                {
                    title: snapshot.val().title,
                    name: name,
                    start: snapshot.val().time,
                    end: time,
                    address: address,
                    description: snapshot.val().description,
                    allDay: false,
                    color: '#A7D799',
                    eventBackgroundColor: '#A7D799'

                },
            ],
        });
    });

    var hardName;
    var hardTitle;
    var hardTime;
    var hardDesc;
    var hardAddress;

    function updateEventText(event) {
        $("#nameOutput").text(event.name);
        $("#titleOutput").text(event.title);
        $("#timeOutput").text(event.start);
        $("#descriptionOutput").text(event.description);
        $("#addressOutput").text(event.address);
    }

    function updateHardInfo(event) {
        hardName = event.name;
        hardTitle = event.title;
        hardTime = event.start;
        hardDesc = event.description;
        hardAddress = event.address;
    }

    function showHardInfo(event) {
        $("#nameOutput").text(hardName);
        $("#titleOutput").text(hardTitle);
        $("#timeOutput").text(hardTime);
        $("#descriptionOutput").text(hardDesc);
        $("#addressOutput").text(hardAddress);
    }

    //Loads the calendar on to the page
    function loadCalendar() {

        calendar.fullCalendar({
            events: [
                {
                    title: "Test",
                    start: "2019-1-25",
                    description: "It's a test apparently.",
                    color: '#A7D799',
                    address: 'The Test Place',
                    name: 'Vol Test'
                    // eventBackgroundColor: '#A7D799'
                },

                {
                    title: "Test2",
                    start: "2019-1-10",
                    description: "It's a second test!",
                    color: '#A7D799',
                    address: 'The Other Test Place',
                    name: 'Testing 2'
                },
            ],

            eventClick: function (event) {

                updateEventText(event);
                showEventInfo();
                updateHardInfo(event);
                $(this).css("backgroundcolor", "#222A3F");
            },

            eventMouseover: function (event) {

                updateEventText(event);
                showEventInfo();
            },

            eventMouseout: function (event) {
                showHardInfo(event);
            }
        });
    }

    loadCalendar();

});