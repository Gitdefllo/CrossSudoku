function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function convertTime(h, m, s) {
        var timeSeconds;
        timeSeconds = parseInt(3600 * h) + parseInt(60 * m) + parseInt(s);
        return timeSeconds;
    }
    function playGame() {
        var game = Alloy.createController("game", {
            newGame: 1,
            timeSecondSudoku: 0,
            timeMinuteSudoku: 0,
            timeHourSudoku: 0
        }).getView();
        game.open();
    }
    function retrieveGame() {
        var game = Alloy.createController("game", {
            newGame: 0,
            timeSecondSudoku: secVal,
            timeMinuteSudoku: minVal,
            timeHourSudoku: hourVal
        }).getView();
        game.open();
    }
    function rewritetime(s) {
        s = s.replace(":", "");
        return s;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.wrapper = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "wrapper"
    });
    $.__views.index.add($.__views.wrapper);
    $.__views.topWrapper = Ti.UI.createView({
        top: 0,
        left: 20,
        right: 20,
        width: Ti.UI.FILL,
        height: 60,
        layout: "horizontal",
        id: "topWrapper"
    });
    $.__views.wrapper.add($.__views.topWrapper);
    $.__views.logo = Ti.UI.createImageView({
        top: 10,
        left: 0,
        right: 10,
        width: 60,
        height: 60,
        id: "logo",
        image: "appicon.png"
    });
    $.__views.topWrapper.add($.__views.logo);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 60,
        color: "#000",
        font: {
            fontSize: 28,
            fontWeight: "bold"
        },
        verticalAlign: "center",
        text: "CrossSudoku",
        id: "title"
    });
    $.__views.topWrapper.add($.__views.title);
    $.__views.contentWrapper = Ti.UI.createView({
        right: 20,
        left: 20,
        top: 120,
        id: "contentWrapper"
    });
    $.__views.wrapper.add($.__views.contentWrapper);
    $.__views.contentView = Ti.UI.createView({
        top: 0,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "contentView"
    });
    $.__views.contentWrapper.add($.__views.contentView);
    $.__views.msgScore = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        top: "40dp",
        bottom: "40dp",
        textAlign: "center",
        layout: "horizontal",
        text: "",
        id: "msgScore"
    });
    $.__views.contentView.add($.__views.msgScore);
    $.__views.bestHour = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        left: 5,
        id: "bestHour"
    });
    $.__views.msgScore.add($.__views.bestHour);
    $.__views.bestMinute = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        id: "bestMinute"
    });
    $.__views.msgScore.add($.__views.bestMinute);
    $.__views.bestSecond = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        id: "bestSecond"
    });
    $.__views.msgScore.add($.__views.bestSecond);
    $.__views.bottomWrapper = Ti.UI.createView({
        bottom: 20,
        left: 20,
        right: 20,
        id: "bottomWrapper"
    });
    $.__views.wrapper.add($.__views.bottomWrapper);
    $.__views.buttonContainer = Ti.UI.createView({
        bottom: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "buttonContainer"
    });
    $.__views.bottomWrapper.add($.__views.buttonContainer);
    $.__views.btnRetrieve = Ti.UI.createView({
        width: "47%",
        height: Ti.UI.SIZE,
        backgroundColor: "green",
        color: "white",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        left: 0,
        id: "btnRetrieve"
    });
    $.__views.buttonContainer.add($.__views.btnRetrieve);
    retrieveGame ? $.__views.btnRetrieve.addEventListener("click", retrieveGame) : __defers["$.__views.btnRetrieve!click!retrieveGame"] = true;
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 20
        },
        backgroundColor: "none",
        top: "10dp",
        bottom: "10dp",
        textAlign: "center",
        text: "continue",
        id: "__alloyId0"
    });
    $.__views.btnRetrieve.add($.__views.__alloyId0);
    $.__views.btnPlay = Ti.UI.createView({
        width: "47%",
        height: Ti.UI.SIZE,
        backgroundColor: "green",
        color: "white",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        right: 0,
        id: "btnPlay"
    });
    $.__views.buttonContainer.add($.__views.btnPlay);
    playGame ? $.__views.btnPlay.addEventListener("click", playGame) : __defers["$.__views.btnPlay!click!playGame"] = true;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 20
        },
        backgroundColor: "none",
        top: "10dp",
        bottom: "10dp",
        textAlign: "center",
        text: "new game",
        id: "__alloyId1"
    });
    $.__views.btnPlay.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var secVal, minVal, hourVal;
    $.btnRetrieve.hide();
    void 0 == $.bestSecond.getText() && $.msgScore.setText('Select "new game" to play.');
    Ti.App.addEventListener("retrieveDatas", function(data) {
        secVal = data.secValues;
        minVal = data.minValues;
        hourVal = data.hourValues;
        if (data.pauseValues) {
            $.btnRetrieve.show();
            alert("You paused at " + hourVal + ":" + minVal + ":" + secVal);
        } else {
            $.btnRetrieve.hide();
            alert("You spend " + hourVal + ":" + minVal + ":" + secVal + " to slove this Sudoku");
            if (void 0 == $.bestSecond.getText()) {
                $.msgScore.setText("Best time:");
                $.bestHour.setText("00:");
                $.bestMinute.setText("00:");
                $.bestSecond.setText("00");
            }
            var myTime = convertTime(hourVal, minVal, secVal);
            var bestTime = convertTime(rewritetime($.bestHour.getText()), rewritetime($.bestMinute.getText()), $.bestSecond.getText());
            if (bestTime > myTime || 0 == bestTime) {
                alert("CONGRATULATIONS !!!!! You beat the best time");
                $.bestHour.setText(hourVal + ":");
                $.bestMinute.setText(minVal + ":");
                $.bestSecond.setText(secVal);
            }
        }
    });
    $.index.open();
    __defers["$.__views.btnRetrieve!click!retrieveGame"] && $.__views.btnRetrieve.addEventListener("click", retrieveGame);
    __defers["$.__views.btnPlay!click!playGame"] && $.__views.btnPlay.addEventListener("click", playGame);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;