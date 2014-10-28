// click event on "back button"
function goBack(e) {
	// pause the game and send the values to index
	Ti.App.fireEvent('retrieveDatas', {
		tableValues: 'Hello'
	});
	// close game view
	$.game_container.close();
}