function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        text: "Best time:\n10'02''56",
        id: "msgScore"
    });
    $.__views.contentView.add($.__views.msgScore);
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
        text: "continue",
        id: "__alloyId1"
    });
    $.__views.btnRetrieve.add($.__views.__alloyId1);
    retrieveGame ? $.__views.__alloyId1.addEventListener("click", retrieveGame) : __defers["$.__views.__alloyId1!click!retrieveGame"] = true;
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
    $.__views.__alloyId2 = Ti.UI.createLabel({
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
        id: "__alloyId2"
    });
    $.__views.btnPlay.add($.__views.__alloyId2);
    playGame ? $.__views.__alloyId2.addEventListener("click", playGame) : __defers["$.__views.__alloyId2!click!playGame"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dataTableSudoku, secVal, minVal, hourVal;
    $.btnRetrieve.hide();
    Ti.App.addEventListener("retrieveDatas", function(data) {
        dataTableSudoku = data.tableValues;
        alert(dataTableSudoku);
        secVal = data.secValues;
        minVal = data.minValues;
        hourVal = data.hourValues;
        $.btnRetrieve.show();
    });
    $.index.open();
    __defers["$.__views.__alloyId1!click!retrieveGame"] && $.__views.__alloyId1.addEventListener("click", retrieveGame);
    __defers["$.__views.__alloyId2!click!playGame"] && $.__views.__alloyId2.addEventListener("click", playGame);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;