// init received arguments
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
	$.timerHour.setText(':' + args.timeHourSudoku);
	setInterval(updateTime, 1000);
}

// update timer every 1sec
function updateTime() {
	++totalSeconds;
	$.timerSecond.setText(':' + writetime(totalSeconds%60));
	$.timerMinute.setText(':' + writetime(parseInt(totalSeconds/60))); //  -- check the minute, it's wrong when minutes aren't 0
	// $.timerHour.setText(':' + writetime(parseInt(totalSeconds/60*60))); -- check the hour, it's wrong
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

// click event on "back button"
function goBack(e) {
	// rewrite function
	var sec = rewritetime($.timerSecond.getText());
	var min = rewritetime($.timerMinute.getText());
	var hr = rewritetime($.timerHour.getText());
	
	// pause the game and send the values to index
	Ti.App.fireEvent('retrieveDatas', {
		tableValues: 'Paused at ' + hr + ':' + min + ':' + sec,
		secValues: sec,
		minValues: min,
		hourValues: hr
	});
	// close game view
	$.game_container.close();
}