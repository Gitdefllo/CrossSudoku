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
        return timeSeconds = parseInt(3600 * h) + parseInt(60 * m) + parseInt(s);
    }
    function updateTime() {
        ++totalSeconds;
        $.timerSecond.setText(":" + writetime(totalSeconds % 60));
        $.timerMinute.setText(":" + writetime(parseInt(totalSeconds / 60)));
        $.timerHour.setText(writetime(parseInt(totalSeconds / 3600)));
    }
    function updateTimeAndroid() {
        ++totalSeconds;
        $.timerMainLabel.setText("Time: " + writetime(parseInt(totalSeconds / 3600)) + ":" + writetime(parseInt(totalSeconds / 60)) + ":" + writetime(totalSeconds % 60));
        andHour = parseInt(totalSeconds / 3600);
        andMin = parseInt(totalSeconds / 60);
        andSec = totalSeconds % 60;
    }
    function writetime(s) {
        var time = s + "";
        return time.length < 2 ? "0" + time : time;
    }
    function initGridAndroid() {
        var row, tf, sf, cpt = 0, count = 0;
        $.tableView.height = Titanium.Platform.displayCaps.dpi + 9;
        $.tableView.width = Ti.UI.SIZE;
        for (i = 1; 9 >= i; i++) {
            row = Ti.UI.createTableViewRow({
                className: "row",
                height: Titanium.Platform.displayCaps.dpi / 9,
                width: Titanium.Platform.displayCaps.dpi,
                layout: "horizontal"
            });
            if (4 == i || 7 == i) {
                sf = Ti.UI.createView({
                    className: "separator",
                    height: 1,
                    width: Titanium.Platform.displayCaps.dpi + 18,
                    layout: "horizontal",
                    backgroundColor: "#ffffff"
                });
                row.add(sf);
            }
            for (j = 1; 9 >= j; j++) {
                tf = Ti.UI.createTextField({
                    id: "case" + j * i,
                    pos: count,
                    height: Titanium.Platform.displayCaps.dpi / 9,
                    width: Titanium.Platform.displayCaps.dpi / 9,
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
                    borderWidth: 1,
                    color: "#fff",
                    top: 1,
                    bottom: 1,
                    right: 1,
                    left: 1,
                    backgroundColor: "#404040",
                    borderColor: "#c4c4c4",
                    maxLength: 1
                });
                if (4 == j || 7 == j) {
                    sf = Ti.UI.createView({
                        className: "separator",
                        height: Titanium.Platform.displayCaps.dpi,
                        width: 1,
                        backgroundColor: "#ffffff"
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
        for (j = 0; 80 >= j; j++) {
            array[j].setValue(arrayStart[j]);
            null != arrayStart[j] ? array[j].setEnabled(false) : array[j].addEventListener("change", function(e) {
                checkCase(e);
            });
        }
    }
    function checkCase(e) {
        if ("" != e.source.value) if (e.source.value != arraySolution[e.source.pos]) {
            e.source.backgroundColor = "#bb2828";
            e.source.color = "#ffffff";
        } else {
            arrayStart[e.source.pos] = e.source.value;
            e.source.backgroundColor = "#28bb28";
            e.source.color = "#ffffff";
            e.source.setEnabled(false);
        }
        checkSudoku();
    }
    function checkSudoku() {
        if (arrayStart.toString() == arraySolution.toString()) {
            sec = andSec;
            min = andMin;
            hr = andHour;
            alert("Well done!!!  Yout time is: " + hr + ":" + min + ":" + sec + ".");
            Ti.App.fireEvent("retrieveDatas", {
                secValues: sec,
                minValues: min,
                hourValues: hr,
                pauseValues: false
            });
            setTimeout(function() {
                $.game_container.close();
            }, 2e3);
        }
    }
    function goBack() {
        sec = andSec;
        min = andMin;
        hr = andHour;
        Ti.App.fireEvent("retrieveDatas", {
            secValues: sec,
            minValues: min,
            hourValues: hr,
            curentGameValue: arrayStart,
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
        backgroundColor: "transparent",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "game_container"
    });
    $.__views.game_container && $.addTopLevelView($.__views.game_container);
    $.__views.topWrapper = Ti.UI.createView({
        top: 10,
        left: 20,
        right: 20,
        height: 60,
        layout: "horizontal",
        id: "topWrapper"
    });
    $.__views.game_container.add($.__views.topWrapper);
    $.__views.leftCorner = Ti.UI.createView({
        left: 0,
        width: "50%",
        height: Ti.UI.SIZE,
        id: "leftCorner"
    });
    $.__views.topWrapper.add($.__views.leftCorner);
    $.__views.backView = Ti.UI.createView({
        left: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "#bb2828",
        color: "#ffffff",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        id: "backView"
    });
    $.__views.leftCorner.add($.__views.backView);
    goBack ? $.__views.backView.addEventListener("click", goBack) : __defers["$.__views.backView!click!goBack"] = true;
    $.__views.backLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        backgroundColor: "transparent",
        top: "10dp",
        right: "10dp",
        bottom: "10dp",
        left: "10dp",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "backLabel"
    });
    $.__views.backView.add($.__views.backLabel);
    $.__views.rightCorner = Ti.UI.createView({
        right: 0,
        width: "50%",
        height: Ti.UI.SIZE,
        id: "rightCorner"
    });
    $.__views.topWrapper.add($.__views.rightCorner);
    $.__views.timerView = Ti.UI.createView({
        right: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "#bb2828",
        color: "#ffffff",
        borderWidth: 1,
        borderColor: "#1b1b1b",
        borderRadius: 6,
        layout: "horizontal",
        id: "timerView"
    });
    $.__views.rightCorner.add($.__views.timerView);
    $.__views.timerMainLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        layout: "horizontal",
        text: "Time:",
        id: "timerMainLabel"
    });
    $.__views.timerView.add($.__views.timerMainLabel);
    $.__views.timerHour = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        left: 5,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "timerHour"
    });
    $.__views.timerMainLabel.add($.__views.timerHour);
    $.__views.timerMinute = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "timerMinute"
    });
    $.__views.timerMainLabel.add($.__views.timerMinute);
    $.__views.timerSecond = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "timerSecond"
    });
    $.__views.timerMainLabel.add($.__views.timerSecond);
    $.__views.sudoWrapper = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "sudoWrapper"
    });
    $.__views.game_container.add($.__views.sudoWrapper);
    $.__views.tableView = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        borderColor: "transparent",
        separatorColor: "transparent",
        top: 20,
        bottom: 5,
        right: 5,
        left: 10,
        layout: "vertical",
        id: "tableView"
    });
    $.__views.sudoWrapper.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sec, min, hr;
    var args = arguments[0] || {};
    var totalSeconds, totalHours;
    var andHour, andMin, andSec;
    $.backLabel.setText("Back");
    var array = [];
    var arraySolution = [ 2, 9, 4, 1, 7, 3, 5, 8, 6, 1, 5, 6, 2, 8, 9, 3, 4, 7, 3, 8, 7, 4, 6, 5, 1, 9, 2, 5, 7, 1, 3, 9, 2, 4, 6, 8, 4, 2, 3, 6, 1, 8, 7, 5, 9, 8, 6, 9, 5, 4, 7, 2, 3, 1, 9, 4, 2, 8, 5, 1, 6, 7, 3, 6, 1, 8, 7, 3, 4, 9, 2, 5, 7, 3, 5, 9, 2, 6, 8, 1, 4 ];
    var arrayStart = [ 2, 9, 4, 1, 7, 3, 5, 8, 6, 1, 5, 6, 2, 8, 9, 3, 4, 7, 3, 8, 7, 4, 6, 5, 1, 9, 2, 5, 7, 1, 3, 9, 2, 4, 6, 8, 4, 2, 3, 6, 1, 8, 7, 5, 9, 8, 6, 9, 5, 4, 7, 2, 3, 1, 9, 4, 2, 8, 5, 1, 6, 7, 3, 6, 1, 8, 7, 3, 4, 9, 2, 5, 7, 3, 5, 9, 2, 6, 8, 1 ];
    if (1 == args.newGame) {
        totalSeconds = 0;
        initGridAndroid();
        setInterval(function() {
            updateTimeAndroid();
        }, 1e3);
    } else {
        totalSeconds = 0;
        arrayStart = args.savedGameValue;
        initGridAndroid();
        setInterval(function() {
            updateTimeAndroid();
        }, 1e3);
    }
    if (0 != args.timeHourSudoku || 0 != args.timeMinuteSudoku || 0 != args.timeSecondSudoku) {
        totalSeconds = args.timeSecondSudoku;
        totalMinutes = args.timeMinuteSudoku;
        totalHours = args.timeHourSudoku;
        totalSeconds = convertTime(args.timeHourSudoku, args.timeMinuteSudoku, args.timeSecondSudoku);
        setInterval(updateTime, 1e3);
    }
    __defers["$.__views.backView!click!goBack"] && $.__views.backView.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;