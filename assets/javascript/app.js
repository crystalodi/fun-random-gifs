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
    var rating = "G";
    var queryURL = "https://api.giphy.com/v1/gifs/random" +
    "?api_key=" + api_key + "&tag=" + tag + "&rating=" + rating;
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })

});
renderButtons();