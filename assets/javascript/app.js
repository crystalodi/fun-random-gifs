var buttonArray = ["the most popular girls in school", "rockos modern life", "gossip girl", "sailor moon", "hey arnold"];

function renderButtons() {
    $("#button-container").empty();
    for(var i = 0; i < buttonArray.length; i++) {
        var button = $("<button class='gif-button'>");
        button.text(buttonArray[i]);
        button.attr("data-search-term", buttonArray[i]);
        $("#button-container").append(button);
    }
}

$(document.body).on("click", ".gif-button", function(){
    var tag = $(this).attr("data-search-term");
    var api_key = "AQ2G208I6ueekgMInH28ImZXlgHXik7a";
    var queryURL = "https://api.giphy.com/v1/gifs/random" +
    "?api_key=" + api_key + "&tag=" + tag;
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        //get the image url from the JSON object response
        var imageUrl = response.data.image_original_url;

        //create a new image on the page
        var gifImage = $("<img>");

        //set the src with the imageUrl variable
        gifImage.attr("src", imageUrl);
        gifImage.attr("alt", "gif");
        gifImage.attr("class", "image-gif");
        //add the most recent gif message to the top of the images container
        $("#gif-container").prepend(gifImage);
    });

});
renderButtons();