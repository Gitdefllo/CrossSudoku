// init variables
var dataTableSudoku, secVal, minVal, hourVal, pausedVal;

// hide "continue" button
$.btnRetrieve.hide();

// retrieve the values when the game is paused or end
Ti.App.addEventListener('retrieveDatas', function(data) {
	
	//dataTableSudoku = data.tableValues;
	//alert(dataTableSudoku);
	
	// retrieve the time
	secVal = data.secValues;
	minVal = data.minValues;
	hourVal = data.hourValues;
	
	if (data.pauseValues) {
		// show "continue" button
		$.btnRetrieve.show();
		alert('You paused at ' + hourVal + ':' + minVal + ':' + secVal);
	} else {
		// hide "continue" button when the game is sloved
		$.btnRetrieve.hide();
		alert('You spend ' + hourVal + ':' + minVal + ':' + secVal +' to slove this Sudoku');
		var myTime = convertTime(hourVal, minVal, secVal);
		var bestTime = convertTime(rewritetime($.bestHour.getText()),
									rewritetime($.bestMinute.getText()),
									$.bestSecond.getText()
						); // recover value in seconds of the bestTime
		
		if (myTime < bestTime || bestTime == 0) {
			alert("CONGRATULATIONS !!!!! You beat the best time" );
			
			// Does not update the label msgScore
			$.bestHour.setText(hourVal + ':');
			$.bestMinute.setText(minVal + ':');
			$.bestSecond.setText(secVal);
		}
	}
});

// This function converts time(hours'minutes"seconds) in seconds 
function convertTime(h,m,s) {
	var timeSeconds;
	
	timeSeconds = parseInt((h*3600)) + parseInt((m*60)) + parseInt(s);
	
	return timeSeconds;
}

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

// replace ":" by a null char
function rewritetime(s) {
	s = s.replace(':','');
	return s;
}

// open the home view
$.index.open();