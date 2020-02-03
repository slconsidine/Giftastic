$(document).ready(function() {

    // array of all the button names
    var buttons = ["cat", "dog", "bird"];

    // for loop that creates a button for each item in the buttons array
    for (i=0; i<buttons.length; i++) {
        $("#btn-holder").append("<button id='" + buttons[i] + "'>" + buttons[i] + "</button>");
    }

    // process that occurs when a button is clicked
    $("button").on("click", function(){
        // creates a variable with what button is calling by using the button's id
        var animal = $(this).attr("id");
        console.log($(this).attr("id"));
        // makes a query using the button name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=mQCa78tyW0RZHnb9NccCWNSey9mFbl6p&limit=10";
        // makes an AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);
            // stores data from AJAX request in results var
            var results = response.data;
            // loops through each result item
            for (var i=0; i<results.length; i++) {
                var animalDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.addClass("gif");
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalDiv.append(rating);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").prepend(animalDiv);
            };
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            });
        });
    });
});