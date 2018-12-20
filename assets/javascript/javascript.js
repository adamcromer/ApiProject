$(document).ready(function () {

    var submit = $("#submit");

    submit.click(function (event) {
        event.preventDefault();
    });




    function searchVolAPI() {

        var apiKey = "e356bef55bb04a799eef5b90f55f3d94";
        var queryURL = "https://apidata.guidestar.org/charitycheck/v1/54-1774039?Subscription-Key=" + apiKey + "&search_term=saltlakecity";

        $.ajax({
            POST: "https://apidata.guidestar.org/charitycheck/v1/54-1774039",
            method: "GET",
            Host: "apidata.guidestar.org",
            Subscription-Key: apiKey
        }).then(function (response) {

            console.log(response);



        });
    }

    searchVolAPI();

});