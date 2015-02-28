// init variables
var dataTableSudoku, secVal, minVal, hourVal, pausedVal, bestTime, helpVal;

// hide "continue" button
$.btnRetrieve.hide();
if (Titanium.Platform.name == 'android') { 
	$.btnRetrieve.visible = false;
}

// hide "bestTime" if it's equals to 0 (no game played yet)
if ($.bestSecond.getText() == undefined || $.bestSecond.getText() == '') {
	$.msgScore.setText("Select \"new game\" to play.");
}

// retrieve the values when the game is paused or end
Ti.App.addEventListener('retrieveDatas', function(data) {
	if (Titanium.Platform.name == 'android') { 
		setTimeout(function(evt){
			$.btnPlay.visible = true;
			$.contentView.visible = true;
	    },500);
	}
	
	// retrieve the time
	secVal = data.secValues;
	minVal = data.minValues;
	hourVal = data.hourValues;
	currentGameValue = data.curentGameValue;
	helpVal = data.helpCounter;
	
	if (data.pauseValues) {
		// show "continue" button
		if (Titanium.Platform.name == 'android') { 
			setTimeout(function(evt){
				$.btnRetrieve.visible = true;
			},500);
		}else {
			$.btnRetrieve.show();
		}
		//alert('You paused at ' + hourVal + ':' + minVal + ':' + secVal);
	} else {
		// hide "continue" button when the game is sloved
		if (Titanium.Platform.name == 'android') {
			setTimeout(function(evt){ 
				$.btnRetrieve.visible = false;
			},500);
		}else{
			$.btnRetrieve.hide();
		}
		//alert('You spend ' + hourVal + ':' + minVal + ':' + secVal +' to slove this Sudoku');
		
		// check if "bestSecond" are empty or undefined
		if ($.bestSecond.getText() == undefined || $.bestSecond.getText() == '') {
			$.msgScore.setText("Best time:");
			$.bestHour.setText('00:');
			$.bestMinute.setText('00:');
			$.bestSecond.setText('00');
		}
		
		var myTime = convertTime(hourVal, minVal, secVal);
		var bestTime = convertTime(rewritetime($.bestHour.getText()),
									rewritetime($.bestMinute.getText()),
									$.bestSecond.getText()
						); // recover value in seconds of the bestTime
		alert("Your best time is: "+bestTime+".");
		
		if (myTime < bestTime || bestTime == 0) {
			alert("CONGRATULATIONS !!!!! You beat the best time" );
			if (Titanium.Platform.name == 'android') { 
				$.msgScore.setText("Best time: "+hourVal + ":" + minVal +":" + secVal);
				$.msgScore.color = '#ffffff';
			}else{
				// Does not update the label msgScore
				$.bestHour.setText(hourVal + ':');
				$.bestHour.color = '#ffffff';
				$.bestMinute.setText(minVal + ':');
				$.bestMinute.color = '#ffffff';
				$.bestSecond.setText(secVal);
				$.bestSecond.color = '#ffffff';
			}
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
	

	if (Titanium.Platform.name == 'android') { 
			$.btnRetrieve.visible = false;
			$.btnPlay.visible = false;
			$.contentView.visible = false;
			game.open();
	} else {
			game.backgroundImage = "background.jpg";
   			game.open();
	}
}

// click event on "continue button"
function retrieveGame(e) {
	var game = Alloy.createController("game", {
		newGame: 0,  // 1: new game, 0: no
		timeSecondSudoku: secVal,
		timeMinuteSudoku: minVal,
		timeHourSudoku: hourVal,
		savedGameValue: currentGameValue,
		helpCounter: helpVal
	}).getView();
	// open the game view
	if (Titanium.Platform.name == 'android') { 
			$.btnRetrieve.visible = false;
			$.btnPlay.visible = false;
			$.contentView.visible = false;
			game.open();
	} else {
			game.backgroundImage = "background.jpg";
   			game.open();
	}
}

// replace ":" by a null char
function rewritetime(s) {
	s = s.replace(':','');
	return s;
}

// open the home view
$.index.backgroundImage = "background.jpg";
$.index.open();