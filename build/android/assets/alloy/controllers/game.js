function __processArg(t,e){var i=null;return t&&(i=t[e]||null,delete t[e]),i}function Controller(){function t(){0==y&&(c.helpView.setTouchEnabled(!1),c.helpView.backgroundColor="#383838")}function e(t,e,i){return timeSeconds=parseInt(3600*t)+parseInt(60*e)+parseInt(i)}function r(){++m,c.timerSecond.setText(":"+o(m%60)),c.timerMinute.setText(":"+o(parseInt(m/60))),c.timerHour.setText(o(parseInt(m/3600)))}function n(){++m,c.timerMainLabel.setText("Time: "+o(parseInt(m/3600))+":"+o(parseInt(m/60))+":"+o(m%60)),I=parseInt(m/3600),E=parseInt(m/60),w=m%60}function o(t){var e=t+"";return e.length<2?"0"+e:e}function s(){var t,e,r,n=0,o=0;for(c.tableView.height=Titanium.Platform.displayCaps.dpi+9,c.tableView.width=Ti.UI.SIZE,i=1;9>=i;i++){for(t=Ti.UI.createTableViewRow({className:"row",height:"43dp",width:"33dp",layout:"horizontal"}),(4==i||7==i)&&(r=Ti.UI.createView({className:"separator",height:1,width:Titanium.Platform.displayCaps.dpi+18,layout:"horizontal",backgroundColor:"#ffffff"}),t.add(r)),j=1;9>=j;j++)e=Ti.UI.createTextField({id:"case"+j*i,pos:o,height:Titanium.UI.FILL,width:"34dp",textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,borderWidth:1,color:"#fff",top:1,bottom:1,right:1,left:1,backgroundColor:"#404040",borderColor:"#c4c4c4",maxLength:1}),(4==j||7==j)&&(r=Ti.UI.createView({className:"separator",height:Titanium.Platform.displayCaps.dpi,width:1,backgroundColor:"#ffffff"}),t.add(r)),t.add(e),A[n]=e,n++,o++;c.tableView.appendRow(t)}for(j=0;80>=j;j++)A[j].setValue(N[j]),null!=N[j]?A[j].setEnabled(!1):A[j].addEventListener("change",function(t){a(t)})}function a(t){""!=t.source.value&&(t.source.value!=L[t.source.pos]?(t.source.backgroundColor="#bb2828",t.source.color="#ffffff"):(N[t.source.pos]=t.source.value,t.source.backgroundColor="#28bb28",t.source.color="#ffffff",t.source.setEnabled(!1))),b=t.source.pos,l()}function l(){N.toString()==L.toString()&&(f=w,g=E,T=I,alert("Well done!!!  Yout time is: "+T+":"+g+":"+f+"."),Ti.App.fireEvent("retrieveDatas",{secValues:f,minValues:g,hourValues:T,pauseValues:!1}),c.game_container.close())}function h(){f=w,g=E,T=I,Ti.App.fireEvent("retrieveDatas",{secValues:f,minValues:g,hourValues:T,curentGameValue:N,pauseValues:!0,helpCounter:y}),c.game_container.close()}function u(){y>0&&b>-1&&(A[b].setValue(L[b]),A[b].backgroundColor="#28bb28",A[b].color="#ffffff",A[b].setEnabled(!1),N[b]=A[b].value,y--,b=-1,c.helpLabel.setText("Solution ("+y+")"),t())}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="game",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var c=this,d={},p={};c.__views.game_container=Ti.UI.createWindow({backgroundColor:"transparent",width:Ti.UI.FILL,height:Ti.UI.FILL,layout:"vertical",id:"game_container"}),c.__views.game_container&&c.addTopLevelView(c.__views.game_container),c.__views.topWrapper=Ti.UI.createView({top:"5%",left:20,right:20,height:60,layout:"horizontal",id:"topWrapper"}),c.__views.game_container.add(c.__views.topWrapper),c.__views.leftCorner=Ti.UI.createView({left:0,width:"50%",height:Ti.UI.SIZE,id:"leftCorner"}),c.__views.topWrapper.add(c.__views.leftCorner),c.__views.backView=Ti.UI.createView({left:0,width:Ti.UI.SIZE,height:Ti.UI.SIZE,backgroundColor:"#bb2828",color:"#ffffff",borderWidth:1,borderColor:"#1b1b1b",borderRadius:6,id:"backView"}),c.__views.leftCorner.add(c.__views.backView),h?c.__views.backView.addEventListener("click",h):p["$.__views.backView!click!goBack"]=!0,c.__views.backLabel=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},backgroundColor:"transparent",top:"10dp",right:"10dp",bottom:"10dp",left:"10dp",verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,id:"backLabel"}),c.__views.backView.add(c.__views.backLabel),c.__views.rightCorner=Ti.UI.createView({right:0,width:"50%",height:Ti.UI.SIZE,id:"rightCorner"}),c.__views.topWrapper.add(c.__views.rightCorner),c.__views.timerView=Ti.UI.createView({right:0,width:Ti.UI.SIZE,height:Ti.UI.SIZE,backgroundColor:"#bb2828",color:"#ffffff",borderWidth:1,borderColor:"#1b1b1b",borderRadius:6,layout:"horizontal",id:"timerView"}),c.__views.rightCorner.add(c.__views.timerView),c.__views.timerMainLabel=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},right:"10dp",top:"10dp",bottom:"10dp",left:"10dp",verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,layout:"horizontal",text:"",id:"timerMainLabel"}),c.__views.timerView.add(c.__views.timerMainLabel),c.__views.timerHour=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},left:5,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,id:"timerHour"}),c.__views.timerMainLabel.add(c.__views.timerHour),c.__views.timerMinute=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,id:"timerMinute"}),c.__views.timerMainLabel.add(c.__views.timerMinute),c.__views.timerSecond=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,id:"timerSecond"}),c.__views.timerMainLabel.add(c.__views.timerSecond),c.__views.sudoWrapper=Ti.UI.createView({top:"0%",bottom:"50dp",right:"0%",left:"0%",width:Titanium.UI.SIZE,height:Titanium.UI.FILL,layout:"horizontal",id:"sudoWrapper"}),c.__views.game_container.add(c.__views.sudoWrapper),c.__views.tableView=Ti.UI.createTableView({height:Ti.UI.SIZE,width:Ti.UI.FILL,backgroundColor:"transparent",borderColor:"transparent",separatorColor:"transparent",top:"5dp",bottom:"5dp",right:"5dp",left:"5dp",layout:"vertical",id:"tableView"}),c.__views.sudoWrapper.add(c.__views.tableView),c.__views.bottomWrapper=Ti.UI.createView({top:10,left:20,right:20,width:Ti.UI.FILL,height:60,layout:"horizontal",id:"bottomWrapper"}),c.__views.game_container.add(c.__views.bottomWrapper),c.__views.helpView=Ti.UI.createView({width:Ti.UI.SIZE,height:Ti.UI.SIZE,backgroundColor:"#bb2828",color:"#ffffff",borderWidth:1,borderColor:"#1b1b1b",borderRadius:6,layout:"horizontal",id:"helpView"}),c.__views.bottomWrapper.add(c.__views.helpView),u?c.__views.helpView.addEventListener("click",u):p["$.__views.helpView!click!helpSolution"]=!0,c.__views.helpLabel=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#ffffff",font:{fontSize:15},backgroundColor:"transparent",top:"10dp",right:"10dp",bottom:"10dp",left:"10dp",verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,id:"helpLabel"}),c.__views.helpView.add(c.__views.helpLabel),d.destroy=function(){},_.extend(c,c.__views);var f,g,T,m,v,I,E,w,y,S=arguments[0]||{},b=-1;c.backLabel.setText("Back");var A=[],L=[2,9,4,1,7,3,5,8,6,1,5,6,2,8,9,3,4,7,3,8,7,4,6,5,1,9,2,5,7,1,3,9,2,4,6,8,4,2,3,6,1,8,7,5,9,8,6,9,5,4,7,2,3,1,9,4,2,8,5,1,6,7,3,6,1,8,7,3,4,9,2,5,7,3,5,9,2,6,8,1,4],N=[2,,,1,,,,,6,,,6,,8,,3,,7,3,,,,6,,,,,,,,,9,,,,,,,,6,,,,,,,,,,4,7,,,1,9,,,8,,,,,3,,,,7,,,9,,,,,5,9,,6,8,1];1==S.newGame?(m=0,y=5,s(),setInterval(function(){n()},1e3)):(m=0,y=S.helpCounter,N=S.savedGameValue,s(),setInterval(function(){n()},1e3)),c.helpLabel.setText("Solution ("+y+")"),t(),(0!=S.timeHourSudoku||0!=S.timeMinuteSudoku||0!=S.timeSecondSudoku)&&(m=S.timeSecondSudoku,totalMinutes=S.timeMinuteSudoku,v=S.timeHourSudoku,m=e(S.timeHourSudoku,S.timeMinuteSudoku,S.timeSecondSudoku),setInterval(r,1e3)),p["$.__views.backView!click!goBack"]&&c.__views.backView.addEventListener("click",h),p["$.__views.helpView!click!helpSolution"]&&c.__views.helpView.addEventListener("click",u),_.extend(c,d)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;