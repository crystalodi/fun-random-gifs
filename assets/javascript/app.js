var topics = ["the most popular girls in school", "rockos modern life", "gossip girl", "sailor moon", "hey arnold"];

function renderButtons() {
    $("#button-container").empty();
    for(var i = 0; i < topics.length; i++) {
        var button = $("<button class='gif-button'>");
        button.text(topics[i]);
        button.attr("data-search-term", topics[i]);
        button.attr("data-offset", 0);
        $("#button-container").append(button);
    }
}

function addSearchTerm(event) {
    event.preventDefault();
    var searchTerm = $("#searchTerm").val().trim();
    if(searchTerm) {
        topics.push(searchTerm);
        renderButtons();
    }
}

function searchGIPHY(){
    var tag = $(this).attr("data-search-term");
    var api_key = "AQ2G208I6ueekgMInH28ImZXlgHXik7a";
    var rating = "G"
    var limit = 10;
    var offset = parseInt($(this).attr("data-offset"));
    var newOffset = offset + 10;
    $(this).attr("data-offset", newOffset);
    var queryURL = "https://api.giphy.com/v1/gifs/search" +
    "?api_key=" + api_key + "&q=" + tag + "&rating=" + rating + "&limit=" + limit + "&offset=" + offset;
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        var gifArray = response.data;
        console.log(response);
        console.log(gifArray);
        for(var i = 0; i < gifArray.length; i++) {
            console.log(gifArray[i]);
            var imageUrl = gifArray[i]["images"]["fixed_height_still"]["url"];
            //create a new image on the page
            var div = $("<div class='gif-img-container'>");
            $("#gif-container").prepend(div);
            var gifImage = $("<img>");
            gifImage.attr("src", imageUrl);
            gifImage.attr("alt", "gif");
            gifImage.attr("class", "image-gif");
            gifImage.attr("data-still", imageUrl);
            gifImage.attr("data-animate", gifArray[i]["images"]["fixed_height"]["url"]);
            gifImage.attr("data-state", "still");
            var rating = $("<div class='rating'>");
            rating.text("Rating: " + gifArray[i]["rating"].toUpperCase());
            div.append(gifImage);
            div.append(rating);
        }
    });
}
function stopStartGIF() {
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    }else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
}
$(document.body).on("click", ".gif-button", searchGIPHY);
$(document.body).on("click", ".image-gif", stopStartGIF);
$(document).ready(renderButtons)
$(".submit-button").on("click", addSearchTerm);