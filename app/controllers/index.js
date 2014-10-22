function doClick(e) {
    alert($.label.text);
}

function playGame(e) {
    var g = Alloy.createController("game", {}).getView();
    g.open();
}

$.index.open();