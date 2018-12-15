var charityAddress = "addresses of various non profits";
initMap();

function initMap () {
    var map = new google.maps.Map($("#map"), {
        zoom: 8,
        center: {lat: 40.760, lng: 111.891}
    });
    // Labels to be used when creating the marker clusters
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // label: labels[i % labels.length] <-----> this goes through the lebels string and treats them like an array.

}