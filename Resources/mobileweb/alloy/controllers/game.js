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
        $.timerHour.setText(writetime(parseInt(totalSeconds / 3600)));
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
        hr = $.timerHour.getText();
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
        hr = $.timerHour.getText();
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
        width: Ti.UI.FILL,
        height: 60,
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
        layout: "horizontal",
        id: "timerView"
    });
    $.__views.topWrapper.add($.__views.timerView);
    $.__views.timerMainLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        right: 0,
        verticalAlign: "center",
        layout: "horizontal",
        text: "Time:",
        id: "timerMainLabel"
    });
    $.__views.timerView.add($.__views.timerMainLabel);
    $.__views.timerHour = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        left: 5,
        verticalAlign: "center",
        id: "timerHour"
    });
    $.__views.timerMainLabel.add($.__views.timerHour);
    $.__views.timerMinute = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        verticalAlign: "center",
        id: "timerMinute"
    });
    $.__views.timerMainLabel.add($.__views.timerMinute);
    $.__views.timerSecond = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 25
        },
        verticalAlign: "center",
        id: "timerSecond"
    });
    $.__views.timerMainLabel.add($.__views.timerSecond);
    $.__views.sudoWrapper = Ti.UI.createView({
        top: 20,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "sudoWrapper"
    });
    $.__views.wrapper.add($.__views.sudoWrapper);
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
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
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
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
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
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
        id: "__alloyId4"
    });
    $.__views.__alloyId1.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createTextField({
        borderWidth: 1,
        size: 150,
        borderColor: "#1b1b1b",
        font: {
            fontSize: 30
        },
        id: "__alloyId5"
    });
    $.__views.__alloyId1.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
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
        id: "__alloyId6"
    });
    $.__views.__alloyId1.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
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
        id: "__alloyId7"
    });
    $.__views.__alloyId1.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
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
        id: "__alloyId8"
    });
    $.__views.__alloyId1.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
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
        id: "__alloyId9"
    });
    $.__views.__alloyId1.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
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
        id: "__alloyId10"
    });
    $.__views.__alloyId1.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
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
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
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
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
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
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
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
        id: "__alloyId15"
    });
    $.__views.__alloyId11.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
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
        id: "__alloyId16"
    });
    $.__views.__alloyId11.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
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
        id: "__alloyId17"
    });
    $.__views.__alloyId11.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
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
        id: "__alloyId18"
    });
    $.__views.__alloyId11.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
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
        id: "__alloyId19"
    });
    $.__views.__alloyId11.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
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
        id: "__alloyId20"
    });
    $.__views.__alloyId11.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId21"
    });
    __alloyId0.push($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
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
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
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
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
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
        id: "__alloyId24"
    });
    $.__views.__alloyId21.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
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
        id: "__alloyId25"
    });
    $.__views.__alloyId21.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
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
        id: "__alloyId26"
    });
    $.__views.__alloyId21.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
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
        id: "__alloyId27"
    });
    $.__views.__alloyId21.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
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
        id: "__alloyId28"
    });
    $.__views.__alloyId21.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
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
        id: "__alloyId29"
    });
    $.__views.__alloyId21.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
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
        id: "__alloyId30"
    });
    $.__views.__alloyId21.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId31"
    });
    __alloyId0.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
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
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
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
        id: "__alloyId33"
    });
    $.__views.__alloyId31.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
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
        id: "__alloyId34"
    });
    $.__views.__alloyId31.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
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
        id: "__alloyId35"
    });
    $.__views.__alloyId31.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
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
        id: "__alloyId36"
    });
    $.__views.__alloyId31.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
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
        id: "__alloyId37"
    });
    $.__views.__alloyId31.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
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
        id: "__alloyId38"
    });
    $.__views.__alloyId31.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
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
        id: "__alloyId39"
    });
    $.__views.__alloyId31.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
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
        id: "__alloyId40"
    });
    $.__views.__alloyId31.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId41"
    });
    __alloyId0.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
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
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
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
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
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
        id: "__alloyId44"
    });
    $.__views.__alloyId41.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createLabel({
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
        id: "__alloyId45"
    });
    $.__views.__alloyId41.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
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
        id: "__alloyId46"
    });
    $.__views.__alloyId41.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
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
        id: "__alloyId47"
    });
    $.__views.__alloyId41.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
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
        id: "__alloyId48"
    });
    $.__views.__alloyId41.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
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
        id: "__alloyId49"
    });
    $.__views.__alloyId41.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
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
        id: "__alloyId50"
    });
    $.__views.__alloyId41.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId51"
    });
    __alloyId0.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
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
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
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
        id: "__alloyId53"
    });
    $.__views.__alloyId51.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createLabel({
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
        id: "__alloyId54"
    });
    $.__views.__alloyId51.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
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
        id: "__alloyId55"
    });
    $.__views.__alloyId51.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
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
        id: "__alloyId56"
    });
    $.__views.__alloyId51.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
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
        id: "__alloyId57"
    });
    $.__views.__alloyId51.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
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
        id: "__alloyId58"
    });
    $.__views.__alloyId51.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
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
        id: "__alloyId59"
    });
    $.__views.__alloyId51.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createLabel({
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
        id: "__alloyId60"
    });
    $.__views.__alloyId51.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId61"
    });
    __alloyId0.push($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
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
        id: "__alloyId62"
    });
    $.__views.__alloyId61.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createLabel({
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
        id: "__alloyId63"
    });
    $.__views.__alloyId61.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
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
        id: "__alloyId64"
    });
    $.__views.__alloyId61.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
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
        id: "__alloyId65"
    });
    $.__views.__alloyId61.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
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
        id: "__alloyId66"
    });
    $.__views.__alloyId61.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
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
        id: "__alloyId67"
    });
    $.__views.__alloyId61.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
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
        id: "__alloyId68"
    });
    $.__views.__alloyId61.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
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
        id: "__alloyId69"
    });
    $.__views.__alloyId61.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
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
        id: "__alloyId70"
    });
    $.__views.__alloyId61.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId71"
    });
    __alloyId0.push($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
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
        id: "__alloyId72"
    });
    $.__views.__alloyId71.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
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
        id: "__alloyId73"
    });
    $.__views.__alloyId71.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
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
        id: "__alloyId74"
    });
    $.__views.__alloyId71.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
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
        id: "__alloyId75"
    });
    $.__views.__alloyId71.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
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
        id: "__alloyId76"
    });
    $.__views.__alloyId71.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
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
        id: "__alloyId77"
    });
    $.__views.__alloyId71.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
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
        id: "__alloyId78"
    });
    $.__views.__alloyId71.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
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
        id: "__alloyId79"
    });
    $.__views.__alloyId71.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createLabel({
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
        id: "__alloyId80"
    });
    $.__views.__alloyId71.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        layout: "horizontal",
        id: "__alloyId81"
    });
    __alloyId0.push($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createLabel({
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
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
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
        id: "__alloyId83"
    });
    $.__views.__alloyId81.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createLabel({
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
        id: "__alloyId84"
    });
    $.__views.__alloyId81.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createLabel({
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
        id: "__alloyId85"
    });
    $.__views.__alloyId81.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createLabel({
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
        id: "__alloyId86"
    });
    $.__views.__alloyId81.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
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
        id: "__alloyId87"
    });
    $.__views.__alloyId81.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createLabel({
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
        id: "__alloyId88"
    });
    $.__views.__alloyId81.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createLabel({
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
        id: "__alloyId89"
    });
    $.__views.__alloyId81.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
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
        id: "__alloyId90"
    });
    $.__views.__alloyId81.add($.__views.__alloyId90);
    $.__views.table = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        top: 20,
        bottom: 20,
        layout: "vertical",
        data: __alloyId0,
        id: "table"
    });
    $.__views.sudoWrapper.add($.__views.table);
    $.__views.bottomWrapper = Ti.UI.createView({
        bottom: 0,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "bottomWrapper"
    });
    $.__views.wrapper.add($.__views.bottomWrapper);
    $.__views.confirmView = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "green",
        color: "white",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        id: "confirmView"
    });
    $.__views.bottomWrapper.add($.__views.confirmView);
    checkSudoku ? $.__views.confirmView.addEventListener("click", checkSudoku) : __defers["$.__views.confirmView!click!checkSudoku"] = true;
    $.__views.btnConfirm = Ti.UI.createLabel({
        width: "47%",
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 20
        },
        backgroundColor: "none",
        top: "10dp",
        bottom: "10dp",
        textAlign: "center",
        text: "confirm",
        id: "btnConfirm"
    });
    $.__views.confirmView.add($.__views.btnConfirm);
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
        $.timerHour.setText(args.timeHourSudoku);
        setInterval(updateTime, 1e3);
    }
    __defers["$.__views.backView!click!goBack"] && $.__views.backView.addEventListener("click", goBack);
    __defers["$.__views.confirmView!click!checkSudoku"] && $.__views.confirmView.addEventListener("click", checkSudoku);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;