// init received arguments
var sec, min, hr;
var args = arguments[0] || {};
var totalSeconds, totalMiutes, totalHours;

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
	setInterval(updateTime, 1000);
}

// initialize Sudoku
initGrid();

// check the time
if(args.timeHourSudoku != 00 || args.timeMinuteSudoku != 00 || args.timeSecondSudoku != 00) {
	totalSeconds = args.timeSecondSudoku;
	totalMinutes = args.timeMinuteSudoku;
	totalHours = args.timeHourSudoku;
	$.timerSecond.setText(':' + totalSeconds);
	$.timerMinute.setText(':' + totalMinutes);
	$.timerHour.setText(totalHours);
	setInterval(updateTime, 1000);
}

// update timer every 1sec
function updateTime() {
	++totalSeconds;
	$.timerSecond.setText(':' + writetime(totalSeconds%60));
	$.timerMinute.setText(':' + writetime(parseInt(totalSeconds/60))); //  -- check the minute, it's wrong when minutes aren't 0
	$.timerHour.setText(writetime(parseInt(totalSeconds/3600))); // -- check the hour? same here.
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
	var cpt = 0, row, tf, sf;
	
	for(i = 1; i<=9; i++){
		row = Ti.UI.createTableViewRow({
			className: "row",
			height: 50, 
			width: 452,
			layout: "horizontal"
		});
		if (i==4 || i==7) {
			sf = Ti.UI.createView({
				id: "separator"+i, 
				height: 1,
				width: Titanium.UI.FILL,
				backgroundColor: '#1b1b1b'
			});
			row.add(sf);
		}
		
		for(j = 1; j<=9; j++){
			tf = Ti.UI.createTextField({
				id: "case"+j*i, 
				pos: j*i-1,
				height: 50,
				width: 50,
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, 
				borderWidth: 1, 
				borderColor: '#c4c4c4',
				maxLength: 1
			});
			if (j==4 || j==7) {
				sf = Ti.UI.createView({
					id: "separator"+j*i, 
					pos: j*i-1,
					height: Titanium.UI.FILL,
					width: 1,
					backgroundColor: '#1b1b1b'
				});
				row.add(sf);
			}
			
			row.add(tf);
			array[cpt] = tf;
			cpt++;
		}
		$.table.add(row);
	}
	
	for(j = 0; j <= 80; j++){
		array[j].setValue(arrayStart[j]);
		if (arrayStart[j] != null) {
			array[j].setEnabled(false);
		} else {
			array[j].addEventListener('blur', function(e){
				if(e.source.value != ""){
					if(e.source.value != arraySolution[e.source.pos]){
						alert("You suck! You wrote: "+e.source.value+" (It should be: "+arraySolution[e.source.pos]+")");
						e.source.backgroundColor = 'red';
						e.source.color = 'white';
					}else{
						alert("Well done!!!");
						arrayStart[e.source.pos] = e.source.value;
						e.source.backgroundColor = 'green';
						e.source.color = 'white';
						e.source.setEnabled(false);
					};
				}	
			});
		}
	}	
}

	
// checks if the sudoku is sloved and send the time spend
function checkSudoku(e){
	/*
	 * TODO: check the sudoku
	 */
	
	// recover my Score at the end
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