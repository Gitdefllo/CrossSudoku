// init variables
var dataTableSudoku, secVal, minVal, hourVal;

// hide "continue" button
$.btnRetrieve.hide();

// retrieve the values when the game is paused
Ti.App.addEventListener('retrieveDatas', function(data) {
	
	dataTableSudoku = data.tableValues;
	alert(dataTableSudoku);
	
	// retrieve the time
	secVal = data.secValues;
	minVal = data.minValues;
	hourVal = data.hourValues;
	
	// show "continue" button
	$.btnRetrieve.show();
});

// click event on "play button"
function playGame(e) {
	// create a new game view
	var game = Alloy.createController("game", {
		newGame: 1, // 1: new game, 0: no
		timeSecondSudoku: 00,
		timeMinuteSudoku: 00,
		timeHourSudoku: 00
	}).getView();
	// open the game view
    game.open();
}

// click event on "continue button"
function retrieveGame(e) {
	var game = Alloy.createController("game", {
		newGame: 0,  // 1: new game, 0: no
		timeSecondSudoku: secVal,
		timeMinuteSudoku: minVal,
		timeHourSudoku: hourVal
	}).getView();
	// open the game view
    game.open();
}

// open the home view
$.index.open();