// init received arguments
var sec, min, hr;
var args = arguments[0] || {};
var totalSeconds, totalMiutes, totalHours;
var andHour, andMin, andSec;

// set text to back button
$.backLabel.setText("Back");

// table with all TextFields (81)
var array = [];
// table with solution
var arraySolution = 	[2, 9, 4, 1, 7, 3, 5, 8, 6,
						 1, 5, 6, 2, 8, 9, 3, 4, 7, 
						 3, 8, 7, 4, 6, 5, 1, 9, 2, 
						 5, 7, 1, 3, 9,	2, 4, 6, 8, 
						 4, 2, 3, 6, 1, 8, 7, 5, 9, 
						 8, 6, 9, 5, 4, 7, 2, 3, 1, 
						 9, 4, 2, 8, 5, 1, 6, 7, 3, 
						 6, 1, 8, 7, 3, 4, 9, 2, 5, 
						 7, 3, 5, 9, 2, 6, 8, 1, 4];
// table with start value						 
var arrayStart = 		[2, , , 1, , , , , 6,
						 , , 6, , 8, , 3, , 7, 
						 3, , , , 6, , , , , 
						 , , , , 9,	, , , , 
						 , , , 6, , , , , , 
						 , , , , 4, 7, , , 1, 
						 9, , , 8, , , , , 3, 
						 , , , 7, , , 9, , , 
						 , , 5, 9, , 6, 8, 1, ];
						 
// check if it's a new game
if(args.newGame == 1) {
	// init the timer and interval time
	totalSeconds = 0;
	// initialize Sudoku
	if (Titanium.Platform.name == 'android') { 
		initGridAndroid();
		setInterval(function(){
   			updateTimeAndroid();
		}, 1000);
	}else {
		initGrid();
		setInterval(updateTime, 1000);	
	}
}else{
	// init the timer and interval time
	totalSeconds = 0;
	// add saved value to arrayStart
	arrayStart = args.savedGameValue;
	// initialize Sudoku
	if (Titanium.Platform.name == 'android') { 
		initGridAndroid();
		setInterval(function(){
   			updateTimeAndroid();
		}, 1000);
	}else {
		initGrid();
		setInterval(updateTime, 1000);	
	}
};

// check the time
if(args.timeHourSudoku != 00 || args.timeMinuteSudoku != 00 || args.timeSecondSudoku != 00) {
	totalSeconds = args.timeSecondSudoku;
	totalMinutes = args.timeMinuteSudoku;
	totalHours = args.timeHourSudoku;
	totalSeconds = convertTime(args.timeHourSudoku, 
		args.timeMinuteSudoku,
		args.timeSecondSudoku);
	setInterval(updateTime, 1000);
}

// convert time (hours'minutes"seconds) in seconds 
function convertTime(h,m,s) {
	return timeSeconds = parseInt((h*3600)) + parseInt((m*60)) + parseInt(s);
}

// update timer every 1sec
function updateTime() {
	++totalSeconds;
	$.timerSecond.setText(':' + writetime(totalSeconds%60));
	$.timerMinute.setText(':' + writetime(parseInt(totalSeconds/60))); //  -- check the minute, it's wrong when minutes aren't 0
	$.timerHour.setText(writetime(parseInt(totalSeconds/3600))); // -- check the hour? same here.
}

// update timer every 1sec
function updateTimeAndroid() {
	++totalSeconds;
	$.timerMainLabel.setText('Time: '+writetime(parseInt(totalSeconds/3600))+':'+writetime(parseInt(totalSeconds/60))+':'+writetime(totalSeconds%60));
	andHour = parseInt(totalSeconds/3600);
	andMin = parseInt(totalSeconds/60);
	andSec = totalSeconds%60;
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

// initialize the grid
function initGrid(){
	var cpt = 0, row, tf, sf, count = 0;
	
	for(i = 1; i<=9; i++){
		row = Ti.UI.createTableViewRow({
			className: "row",
			height: 50, 
			width: 452,
			layout: "horizontal"
		});
		if (i==4 || i==7) {
			sf = Ti.UI.createView({
				className: "separator", 
				height: 1,
				width: Titanium.UI.FILL,
				backgroundColor: '#bb2828'
			});
			row.add(sf);
		}
		
		for(j = 1; j<=9; j++){
			 
			if (Titanium.Platform.name != 'mobileweb') { 
				// Number pad for mobile
				tf = Ti.UI.createTextField({
					id: "case"+j*i, 
					pos: count,
					height: 50,
					width: 50,
					textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
					keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
					borderWidth: 1, 
					color: "#fff",
					backgroundColor: "#aa2828",
					borderColor: '#c4c4c4',
					maxLength: 1
				});
			} else {
				// No number pad
				tf = Ti.UI.createTextField({
					id: "case"+j*i, 
					pos: count,
					height: 50,
					width: 50,
					textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
					borderWidth: 1, 
					color: "#fff",
					backgroundColor: "#404040",
					borderColor: '#c4c4c4',
					maxLength: 1
				});
			}
			if (j==4 || j==7) {
				sf = Ti.UI.createView({
					className: "separator",
					height: Titanium.UI.FILL,
					width: 1,
					backgroundColor: '#bb2828'
				});
				row.add(sf);
			}
			
			row.add(tf);
			array[cpt] = tf;
			cpt++;
			count++;
		}
		$.tableView.appendRow(row);
	}
	
	for(j = 0; j <= 80; j++){
		array[j].setValue(arrayStart[j]);
		if (arrayStart[j] != null) {
			array[j].setEnabled(false);
			array[j].backgroundColor = '#383838';
		} else {
			array[j].addEventListener('blur', function(e){
				checkCase(e);
			});
		}
	}
}


function initGridAndroid(){
	var cpt = 0, row, tf, sf, count = 0;
	
	$.tableView.height = Titanium.Platform.displayCaps.dpi+9;
	$.tableView.width = Ti.UI.SIZE;
	
	for(i = 1; i<=9; i++){
		row = Ti.UI.createTableViewRow({
			className: "row",
			height: Titanium.Platform.displayCaps.dpi/9, 
			width: Titanium.Platform.displayCaps.dpi,
			layout: "horizontal"
		});
		if (i==4 || i==7) {
			sf = Ti.UI.createView({
				className: "separator", 
				height: 1,
				width: Titanium.Platform.displayCaps.dpi+18,
				layout: 'horizontal',
				backgroundColor: '#ffffff'
			});
			row.add(sf);
		}
	
		for(j = 1; j<=9; j++){
			tf = Ti.UI.createTextField({
				id: "case"+j*i, 
				pos: count,
				height: Titanium.Platform.displayCaps.dpi/9,
				width: Titanium.Platform.displayCaps.dpi/9,
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
				borderWidth: 1, 
				color: "#fff",
				top:1, bottom: 1, right: 1, left: 1,
				backgroundColor: "#404040",
				borderColor: '#c4c4c4',
				maxLength: 1
			});
			
			if (j==4 || j==7) {
				sf = Ti.UI.createView({
					className: "separator",
					height: Titanium.Platform.displayCaps.dpi,
					width: 1,
					backgroundColor: '#ffffff'
				});
				row.add(sf);
			}
			
			row.add(tf);
			array[cpt] = tf;
			cpt++;
			count++;
		}
		$.tableView.appendRow(row);
	}
	
	for(j = 0; j <= 80; j++){
		array[j].setValue(arrayStart[j]);
		if (arrayStart[j] != null) {
			array[j].setEnabled(false);
		} else {
			array[j].addEventListener('change', function(e){
				checkCase(e);
			});
		}
	}
}

// checks if case's value is right
function checkCase(e){
	if(e.source.value != ""){
		if(e.source.value != arraySolution[e.source.pos]){
			//alert("You suck! You wrote: "+e.source.value+" (It should be: "+arraySolution[e.source.pos]+")");
			e.source.backgroundColor = '#bb2828';
			e.source.color = '#ffffff';
		}else{
			//alert("Well done!!!");
			arrayStart[e.source.pos] = e.source.value;
			e.source.backgroundColor = '#28bb28';
			e.source.color = '#ffffff';
			e.source.setEnabled(false);
		};
	}	
	checkSudoku();
}

	
// checks if the sudoku is sloved and send the time spend
function checkSudoku(){
	// check the sudoku submitted
	if(arrayStart.toString() == arraySolution.toString()){
		if (Titanium.Platform.name == 'android') {
			sec = andSec;
			min = andMin;
			hr = andHour;
		} else{
			sec = rewritetime($.timerSecond.getText());
			min = rewritetime($.timerMinute.getText());
			hr = $.timerHour.getText();
		}
		
		alert("Well done!!!  Yout time is: "+hr+":"+min+":"+sec+".");
		
		Ti.App.fireEvent('retrieveDatas', {
			secValues: sec,
			minValues: min,
			hourValues: hr,
			pauseValues: false
		});
		
		// close game view
		$.game_container.close();
	}
}

// click event on "back button"
function goBack(e) {
	if (Titanium.Platform.name == 'android') {
			sec = andSec;
			min = andMin;
			hr = andHour;
	} else{
			sec = rewritetime($.timerSecond.getText());
			min = rewritetime($.timerMinute.getText());
			hr = $.timerHour.getText();
	}
	
	// pause the game and send the values to index
	Ti.App.fireEvent('retrieveDatas', {
		secValues: sec,
		minValues: min,
		hourValues: hr,
		curentGameValue: arrayStart,
		pauseValues: true
	});
	// close game view
	$.game_container.close();
}