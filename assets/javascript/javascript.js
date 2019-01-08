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
    var ref = database.ref();

    //Declaring variables equal to their HTML counterparts
    var zipSearch = $("#zipSearch");
    var currentTime = $("#currentTime");
    var emptyTimeVar;
    var calendar = $('#calendar');
    var mapCont = $("#map");
    var fullCalCont = $("#fullCalCont")
    var next = $("#next");
    var previous = $("#previous");
    var month = $("#monthView");
    var week = $("#weekView");
    var day = $("#dayView");
    var addEvent = $(".addEvent");
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
    var calendarNav = $(".calendarNav")
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

    var geocoder;
    geocoder = new google.maps.Geocoder();
    var locations = [];
    var markers = [];
    var eventArray = [];

    ref.on("child_added", function (snapshot) {
        eventArray.push(snapshot.val());
    });

	ref.once("value", function() {
		loadCalendar();
		initMap();
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
        mapCont.toggle();
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
        var latAddress;
        var lngAddress;

        //Shows an error if an input is empty.
        if (name === "" || title === "" || address === "" || date === "" || time === "" || description === "") {
            error.show();
        }

        var deferred = new jQuery.Deferred();

        codeAddress();
        function codeAddress() {
            var geoAddress = address;
            geocoder.geocode({ 'address': geoAddress }, function (results, status) {
                if (status == 'OK') {
                    latAddress = results[0].geometry.location.lat();
                    lngAddress = results[0].geometry.location.lng();
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        function databasePush() {
			var dbObj = {
                name: name,
                title: title,
                address: address,
                lat: latAddress,
                lng: lngAddress,
                start: date,
                end: date,
                time: time,
                description: description
			};
			
            //Pushes the values to Firebase
            database.ref().push(dbObj);

			calendar.fullCalendar("renderEvent", dbObj);
			addNewMapMarker(latAddress, lngAddress);

            clearSubmit();
            error.hide();
			eventDiv.hide("drop", { direction: "right" }, "slow");
			
        }

        $.when(deferred).then(databasePush);
    });

    eventReset.click(function () {
        event.preventDefault();
        clearSubmit();
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
            events: eventArray,
            eventColor: '#A7D799',
            eventClick: function (event) {
                        updateHardInfo(event),
                        updateEventText(event),
                        showEventInfo()
                    },
                    eventMouseover: function (event) {
                        updateEventText(event),
                        showEventInfo()
                    },
                    eventMouseout: function (event) {
                        showHardInfo(event)
                    }
        });
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.635679, lng: -111.905296 },
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
        // Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		
		for(var i = 0; i < eventArray.length; i++){
			if(eventArray[i].lat == undefined){
				
			}else{
				var obj = {
					lat: eventArray[i].lat,
					lng: eventArray[i].lng
				}
				locations.push(obj);
			}
		}
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
		// The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function (location, i) {
			console.log(location);
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
	}
	
	function addNewMapMarker(lat, lng){
		var location = new google.maps.LatLng(lat, lng);
		marker = new google.maps.Marker({
			position: location,
			animation: google.maps.Animation.DROP,
			map: map
		});
    }

    

});