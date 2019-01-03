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
    var calendarCont = $("#calendarCont");
    var emptyCalVar;
    var eventInfo = $("#eventInfo");
    var testButton = $("#testButton");

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
        calendarCont.toggle("drop", { direction: "right" }, "slow");
        eventInfo.toggle("drop", { direction: "right" }, "slow");
    }

    // This minimizes the calendar and shows the event info on the side.
    function showEventInfo() {
        calendarCont.toggle("drop", { direction: "left" }, "");        
        calendarCont.toggleClass("smallCal", 1);
        emptyCalVar = setTimeout(shrinkCal, 750);
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

    testButton.click(function () {
        event.preventDefault();
        showEventInfo();
    });
    eventReset.click(function () {
        event.preventDefault();
        clearSubmit();
    });

    // function snapshotToArray(snapshot) {
    //     var returnArr = [];

    //     snapshot.forEach(function (childSnapshot) {
    //         var item = childSnapshot.val();
    //         item.key = childSnapshot.key;

    //         returnArr.push(item);
    //     });

    //     return returnArr;
    // };

    // var snapshotArr = snapshotToArray(snapshot);
    // console.log("firebase", snapshotArr);

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
                    title: title,
                    name: name,
                    start: dateAndTime,
                    end: dateAndTime,
                    address: address,
                    description: description,
                    allDay: false,
                    color: '#A7D799',
                    eventBackgroundColor: '#A7D799'

                }
            ],
        });
    });

    //Loads the calendar on to the page
    function loadCalendar() {

        calendar.fullCalendar({
            events: [
                {
                    title: "Test",
                    start: "2018-12-25",
                    description: "It's Christmas apparently.",
                    color: '#A7D799'
                    // eventBackgroundColor: '#A7D799'
                }
            ],
        });
    }

    loadCalendar();

});