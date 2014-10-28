function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goBack() {
        Ti.App.fireEvent("retrieveDatas", {
            tableValues: "Hello"
        });
        $.game_container.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "game";
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
    $.__views.game_container = Ti.UI.createWindow({
        backgroundColor: "white",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "game_container"
    });
    $.__views.game_container && $.addTopLevelView($.__views.game_container);
    $.__views.wrapper = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "wrapper"
    });
    $.__views.game_container.add($.__views.wrapper);
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
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 60,
        color: "#000",
        font: {
            fontSize: 28,
            fontWeight: "bold"
        },
        verticalAlign: "center",
        text: "&lt; Back",
        id: "title"
    });
    $.__views.topView.add($.__views.title);
    goBack ? $.__views.title.addEventListener("click", goBack) : __defers["$.__views.title!click!goBack"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.title!click!goBack"] && $.__views.title.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;