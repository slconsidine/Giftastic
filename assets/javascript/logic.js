$(document).ready(function() {
    // array of all the button names
    var buttons = ["button1", "button2", "button3"];

    // for loop that creates a button for each item in the buttons array
    for (i=0; i<buttons.length; i++) {
        $("#btn-holder").append("<button>" + buttons[i] + "</button>");
        
    }
    
    ("button").on("click", function(){

    })
});