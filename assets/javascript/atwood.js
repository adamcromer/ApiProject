$(document).ready(function () {
    var charityAddress = "addresses of various non profits";
    var locations = [
        { lat: 40.7755, lng: -111.8904 },
        { lat: 40.7649, lng: -111.8421 },
        { lat: 40.7672, lng: -111.8946 },
        { lat: 40.6146, lng: -111.9109 },
        { lat: 40.641, lng: -111.689 }
    ]
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10.5,
            center: { lat: 40.760, lng: -111.891 }
        });
        // Labels to be used when creating the marker clusters
        var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        var markers = locations.map(function (location, i) {

            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length] //  <-----> this goes through the lebel string and treats them like an array.
            });

        });
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

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


        // creating the marker variable to control the cluster of markers.
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        console.log(markers);
        return (markers);
    }
    initMap();
});