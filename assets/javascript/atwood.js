$(document).ready(function () {
    var charityAddress = "addresses of various non profits";
    var locations = [];

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10.5,
            center: { lat: 40.635679, lng: -111.905296 },
            mapTypeId: 'roadmap'
        });
        // Labels to be used when creating the marker clusters
        var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        var markers = locations.map(function (location, i) {

            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length] //  <-----> this goes through the lebel string and treats them like an array.
            });

        });


        //Setting variables to use for the getDetails function.
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        //Getting the details for individual places on google maps.
        service.getDetails({
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                        'Place ID: ' + place.place_id + '<br>' +
                        place.formatted_address + '</div>');
                    infowindow.open(map, this);
                });
            }
        });
        //Creating the search box and inking the seach box to the correct id
        var input = $("#validationCustom05");
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        var markers = [];
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            //Clear old markers.
            locations.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
        });
        //Getting the icon, name, and location for each place.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("The returned place does not have any geometry.")
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            //Creating a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);

        // creating the marker variable to control the cluster of markers.
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        return (markers);
    };

    initMap();

});