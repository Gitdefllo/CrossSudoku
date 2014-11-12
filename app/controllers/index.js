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
	
	if(data.pauseValues=='true'){
		// show "continue" button
		$.btnRetrieve.show();
		alert('Paused at ' + hourVal + ':' + minVal + ':' + secVal);
	}
	else{
		// hide "continue" button when the game is slove
		$.btnRetrieve.hide();
		alert('You spend ' + hourVal + ':' + minVal + ':' + secVal +' to slove this Sudoku');
		var myTime = convertTime(hourVal,minVal,secVal);
		var bestTime = convertTime($.bestHour.getText(),$.bestMinute.getText(),$.bestSecond.getText()); //recover value in seconds of the bestTime
		
		if(myTime < bestTime){
			alert("CONGRATULATIONS !!!!! You beat the best time" );
			
			//Does not update the label msgScore
			$.bestHour.setText(hourVal);
			$.bestMinute.setText(minVal);
			$.bestSecond.setText(secVal);
		}
	}
});

//This function convert time(hours'minutes"seconds) in seconds 
function convertTime(h,m,s){
	var timeSeconds;
	
	timeSeconds= parseInt((h*3600)) + parseInt((m*60)) + parseInt(s);
	
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

// open the home view
$.index.open();