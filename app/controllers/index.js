// create the child view (game view)
var game = Alloy.createController("game", {}).getView();

// hide "continue" button
$.btnRetrieve.hide();

// retrieve the values when the game is paused
Ti.App.addEventListener('retrieveDatas', function(data) {
	alert('You sent me : ' + data.tableValues);
	// show "continue" button
	$.btnRetrieve.show();
	// enable click event on it
});

// click event on "play button"
function playGame(e) {
	// open the game view
    game.open();
}

// click event on "continue button"
function retrieveGame(e) {
	alert("continue");
}

// open the home view
$.index.open();