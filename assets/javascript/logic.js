$(document).ready(function() {

    // array of all the button names
    var buttons = ["The Office", "Michael Scott", "Jim Halpert", "Dwight Schrute", "Stanley", "Jim and Pam"];

    // for loop that creates a button for each item in the buttons array
    for (i=0; i<buttons.length; i++) {
        $("#btn-holder").append("<button class='premade' id='" + buttons[i] + "'>" + buttons[i] + "</button>");
    }


    // process that occurs when a button is clicked
    $(".premade").on("click", function(){
        // clears div so that new ones can be added and aren't just adding on and on 
        $("#gifs-appear-here").empty();
        // creates a variable with what button is calling by using the button's id
        var office = $(this).attr("id");
        console.log(office);
        // makes a query using the button name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + office + "&api_key=mQCa78tyW0RZHnb9NccCWNSey9mFbl6p&limit=10";
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
                var officeDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var officeImage = $("<img>");
                officeImage.attr("src", results[i].images.fixed_height_still.url);
                officeImage.addClass("gif");
                officeImage.attr("data-still", results[i].images.fixed_height_still.url);
                officeImage.attr("data-animate", results[i].images.fixed_height.url);
                officeImage.attr("data-state", "still");
                officeDiv.append(rating);
                officeDiv.append(officeImage);
                $("#gifs-appear-here").prepend(officeDiv);
            };
            // process that occurs when a gif is clicked
            $(".gif").on("click", function() {
                // creates a variable to hold that state of the gif (play/pause)
                var state = $(this).attr("data-state");
                console.log(state);
                // if it's clicked and the state is still, gif will start to play
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

    // add a new user search button
    $("#submit").on("click", function() {
        event.preventDefault();
        var searchTerm = $("#search-query").val()
        console.log(searchTerm);
        $("#btn-holder").append("<button class='premade' id='" + searchTerm+ "'>" + searchTerm + "</button>");
    })    

});