function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateTime() {
        ++totalSeconds;
        $.timerSecond.setText(":" + writetime(totalSeconds % 60));
        $.timerMinute.setText(":" + writetime(parseInt(totalSeconds / 60)));
    }
    function writetime(s) {
        var time = s + "";
        return time.length < 2 ? "0" + time : time;
    }
    function rewritetime(s) {
        s = s.replace(":", "");
        return s;
    }
    function checkSudoku() {
        sec = rewritetime($.timerSecond.getText());
        min = rewritetime($.timerMinute.getText());
        hr = rewritetime($.timerHour.getText());
        Ti.App.fireEvent("retrieveDatas", {
            secValues: sec,
            minValues: min,
            hourValues: hr,
            pauseValues: false
        });
        $.game_container.close();
    }
    function goBack() {
        sec = rewritetime($.timerSecond.getText());
        min = rewritetime($.timerMinute.getText());
        hr = rewritetime($.timerHour.getText());
        Ti.App.fireEvent("retrieveDatas", {
            secValues: sec,
            minValues: min,
            hourValues: hr,
            pauseValues: true
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
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.game_container.add($.__views.wrapper);
    $.__views.topWrapper = Ti.UI.createView({
        top: 10,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "horizontal",
        id: "topWrapper"
    });
    $.__views.wrapper.add($.__views.topWrapper);
    $.__views.backView = Ti.UI.createView({
        left: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "#e2e2e2",
        color: "black",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        id: "backView"
    });
    $.__views.topWrapper.add($.__views.backView);
    goBack ? $.__views.backView.addEventListener("click", goBack) : __defers["$.__views.backView!click!goBack"] = true;
    $.__views.backLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 25
        },
        backgroundColor: "none",
        top: "5dp",
        bottom: "5dp",
        right: "20dp",
        left: "20dp",
        verticalAlign: "center",
        text: "&lt; back",
        id: "backLabel"
    });
    $.__views.backView.add($.__views.backLabel);
    $.__views.timerView = Ti.UI.createView({
        right: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "timerView"
    });
    $.__views.topWrapper.add($.__views.timerView);
    $.__views.timerMainLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        layout: "horizontal",
        text: "Time:",
        id: "timerMainLabel"
    });
    $.__views.timerView.add($.__views.timerMainLabel);
    $.__views.timerHour = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "00",
        id: "timerHour"
    });
    $.__views.timerMainLabel.add($.__views.timerHour);
    $.__views.timerMinute = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "00",
        id: "timerMinute"
    });
    $.__views.timerMainLabel.add($.__views.timerMinute);
    $.__views.timerSecond = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "00",
        id: "timerSecond"
    });
    $.__views.timerMainLabel.add($.__views.timerSecond);
    $.__views.btnValider = Ti.UI.createButton({
        left: "0",
        title: "Valider",
        id: "btnValider"
    });
    $.__views.topWrapper.add($.__views.btnValider);
    checkSudoku ? $.__views.btnValider.addEventListener("click", checkSudoku) : __defers["$.__views.btnValider!click!checkSudoku"] = true;
    var __alloyId0 = [];
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createTextField({
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.row = Ti.UI.createTableViewRow({
        left: 0,
        top: 0,
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "1",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "2",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "3",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "4",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "5",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "6",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "7",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "8",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.labelInTable = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        text: "9",
        id: "labelInTable"
    });
    $.__views.row.add($.__views.labelInTable);
    $.__views.table = Ti.UI.createTableView({
        width: Titanium.UI.SIZE,
        backgroundColor: "white",
        top: 20,
        left: 20,
        right: 20,
        layout: "vertical",
        data: __alloyId0,
        id: "table"
    });
    $.__views.wrapper.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sec, min, hr;
    var args = arguments[0] || {};
    if (1 == args.newGame) {
        var totalSeconds = 0;
        setInterval(updateTime, 1e3);
    }
    if (0 != args.timeHourSudoku || 0 != args.timeMinuteSudoku || 0 != args.timeSecondSudoku) {
        var totalSeconds = args.timeSecondSudoku;
        $.timerSecond.setText(":" + args.timeSecondSudoku);
        $.timerMinute.setText(":" + args.timeMinuteSudoku);
        $.timerHour.setText(":" + args.timeHourSudoku);
        setInterval(updateTime, 1e3);
    }
    __defers["$.__views.backView!click!goBack"] && $.__views.backView.addEventListener("click", goBack);
    __defers["$.__views.btnValider!click!checkSudoku"] && $.__views.btnValider.addEventListener("click", checkSudoku);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;