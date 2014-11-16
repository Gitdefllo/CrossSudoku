// init received arguments
var sec, min, hr;
var args = arguments[0] || {};

// check if it's a new game
if(args.newGame == 1) {
	// init the timer and interval time
	var totalSeconds = 0;
	setInterval(updateTime, 1000);
}

// check the time
if(args.timeHourSudoku != 00 || args.timeMinuteSudoku != 00 || args.timeSecondSudoku != 00) {
	var totalSeconds = args.timeSecondSudoku;
	$.timerSecond.setText(':' + args.timeSecondSudoku);
	$.timerMinute.setText(':' + args.timeMinuteSudoku);
	$.timerHour.setText(args.timeHourSudoku);
	setInterval(updateTime, 1000);
}

// update timer every 1sec
function updateTime() {
	++totalSeconds;
	$.timerSecond.setText(':' + writetime(totalSeconds%60));
	$.timerMinute.setText(':' + writetime(parseInt(totalSeconds/60))); //  -- check the minute, it's wrong when minutes aren't 0
	$.timerHour.setText(writetime(parseInt(totalSeconds/3600))); // -- check the hour?
}

// to write time with "0" in first position
// (ex. with="02:06:04" without="2:6:4")
function writetime(s) {
	var time = s + "";
	if(time.length < 2) {
		return "0" + time;
	} else {
		return time;
	}
}

// replace ":" by a null char
function rewritetime(s) {
	s = s.replace(':','');
	return s;
}

// This function checks if the sudoku is sloved and send the time spend
function checkSudoku(e){
	/*
	 * TODO: Check if the sudoku is correct 
	 */
	//recover my Score at the end
	sec = rewritetime($.timerSecond.getText());
	min = rewritetime($.timerMinute.getText());
	hr = $.timerHour.getText();
	 
	Ti.App.fireEvent('retrieveDatas', {
		secValues: sec,
		minValues: min,
		hourValues: hr,
		pauseValues: false
	});
	
	// close game view
	$.game_container.close();
}

// click event on "back button"
function goBack(e) {
	
	sec = rewritetime($.timerSecond.getText());
	min = rewritetime($.timerMinute.getText());
	hr = $.timerHour.getText();
	 
	// pause the game and send the values to index
	Ti.App.fireEvent('retrieveDatas', {
		secValues: sec,
		minValues: min,
		hourValues: hr,
		pauseValues: true
	});
	// close game view
	$.game_container.close();
}