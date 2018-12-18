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
            console.log("hello")
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length] //  <-----> this goes through the lebel string and treats them like an array.
            });

        });


        // creating the marker variable to control the cluster of markers.
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        console.log(markers);
        return (markers);
    }
    initMap();
});