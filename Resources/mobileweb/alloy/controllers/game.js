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
    function initGrid() {
        var cpt = 0;
        var row;
        var tf;
        for (i = 1; 9 >= i; i++) {
            row = Ti.UI.createTableViewRow({
                className: "row",
                height: 51,
                width: 460,
                backgroundColor: 0,
                layout: "horizontal"
            });
            for (j = 1; 9 >= j; j++) {
                tf = Ti.UI.createTextField({
                    id: "case" + j * i,
                    pos: j * i - 1,
                    height: 50,
                    width: 50,
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    borderWidth: 1,
                    borderColor: "#1b1b1b"
                });
                row.add(tf);
                array[cpt] = tf;
                cpt++;
            }
            $.table.add(row);
        }
        for (j = 0; 80 >= j; j++) {
            array[j].setValue(arrayStart[j]);
            null != arrayStart[j] ? array[j].setEnabled(false) : array[j].addEventListener("blur", function(e) {
                if ("" != e.source.value) if (e.source.value != arraySolution[e.source.pos]) {
                    alert("t'es nul !!! ta valeur:" + e.source.value + " (reponse:" + arraySolution[e.source.pos] + ")");
                    e.source.backgroundColor = "red";
                    e.source.color = "white";
                } else {
                    alert("t'es trop fort !!!");
                    arrayStart[e.source.pos] = e.source.value;
                    e.source.backgroundColor = "green";
                    e.source.color = "white";
                    e.source.setEnabled(false);
                }
            });
        }
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
        width: Titanium.UI.FILL,
        id: "sudoWrapper"
    });
    $.__views.wrapper.add($.__views.sudoWrapper);
    $.__views.table = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        top: 20,
        bottom: 20,
        layout: "vertical",
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
    var array = [];
    var arraySolution = [ 2, 9, 4, 1, 7, 3, 5, 8, 6, 1, 5, 6, 2, 8, 9, 3, 4, 7, 3, 8, 7, 4, 6, 5, 1, 9, 2, 5, 7, 1, 3, 9, 2, 4, 6, 8, 4, 2, 3, 6, 1, 8, 7, 5, 9, 8, 6, 9, 5, 4, 7, 2, 3, 1, 9, 4, 2, 8, 5, 1, 6, 7, 3, 6, 1, 8, 7, 3, 4, 9, 2, 5, 7, 3, 5, 9, 2, 6, 8, 1, 4 ];
    var arrayStart = [ 2, , , 1, , , , , 6, , , 6, , 8, , 3, , 7, 3, , , , 6, , , , , , , , , 9, , , , , , , , 6, , , , , , , , , , 4, 7, , , 1, 9, , , 8, , , , , 3, , , , 7, , , 9, , , , , 5, 9, , 6, 8, 1 ];
    if (1 == args.newGame) {
        var totalSeconds = 0;
        setInterval(updateTime, 1e3);
    }
    initGrid();
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