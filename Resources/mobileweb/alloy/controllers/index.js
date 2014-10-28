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
        game.open();
    }
    function retrieveGame() {
        alert("continue");
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
    $.__views.topView = Ti.UI.createView({
        top: 0,
        left: 20,
        right: 20,
        width: Ti.UI.FILL,
        height: 60,
        layout: "horizontal",
        id: "topView"
    });
    $.__views.wrapper.add($.__views.topView);
    $.__views.logo = Ti.UI.createImageView({
        top: 10,
        left: 0,
        right: 10,
        width: 60,
        height: 60,
        id: "logo",
        image: "appicon.png"
    });
    $.__views.topView.add($.__views.logo);
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
    $.__views.topView.add($.__views.title);
    $.__views.contentView = Ti.UI.createView({
        bottom: 70,
        top: 120,
        width: Ti.UI.FILL,
        height: "auto",
        id: "contentView"
    });
    $.__views.wrapper.add($.__views.contentView);
    $.__views.msgScore = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        textAlign: "center",
        text: "Best time:\n10'02''56",
        id: "msgScore"
    });
    $.__views.contentView.add($.__views.msgScore);
    $.__views.bottomView = Ti.UI.createView({
        bottom: 0,
        left: 20,
        right: 20,
        id: "bottomView"
    });
    $.__views.wrapper.add($.__views.bottomView);
    $.__views.wrapButton = Ti.UI.createView({
        bottom: 30,
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "wrapButton"
    });
    $.__views.bottomView.add($.__views.wrapButton);
    $.__views.btnRetrieve = Ti.UI.createButton({
        font: {
            fontSize: 25
        },
        backgroundColor: "green",
        color: "white",
        borderRadius: 6,
        textAlign: "center",
        bottom: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "CONTINUE",
        id: "btnRetrieve"
    });
    $.__views.wrapButton.add($.__views.btnRetrieve);
    retrieveGame ? $.__views.btnRetrieve.addEventListener("click", retrieveGame) : __defers["$.__views.btnRetrieve!click!retrieveGame"] = true;
    $.__views.btnPlay = Ti.UI.createButton({
        font: {
            fontSize: 25
        },
        backgroundColor: "green",
        color: "white",
        borderRadius: 6,
        textAlign: "center",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "NEW GAME",
        id: "btnPlay"
    });
    $.__views.wrapButton.add($.__views.btnPlay);
    playGame ? $.__views.btnPlay.addEventListener("click", playGame) : __defers["$.__views.btnPlay!click!playGame"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var game = Alloy.createController("game", {}).getView();
    $.btnRetrieve.hide();
    Ti.App.addEventListener("retrieveDatas", function(data) {
        alert("You sent me : " + data.tableValues);
        $.btnRetrieve.show();
    });
    $.index.open();
    __defers["$.__views.btnRetrieve!click!retrieveGame"] && $.__views.btnRetrieve.addEventListener("click", retrieveGame);
    __defers["$.__views.btnPlay!click!playGame"] && $.__views.btnPlay.addEventListener("click", playGame);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;