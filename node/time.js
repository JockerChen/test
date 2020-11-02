
var arrayEvent=[
  {'eventChineseName':'定时下载','eventName':'downloadBasic','eventCnt':'1','eventTimer':"1528"},
  {'eventChineseName':'定时上传','eventName':'uploadBasic','eventCnt':'1','eventTimer':"1529"},
  {'eventChineseName':'设备质检','eventName':'checkBasic','eventCnt':'1','eventTimer':"1530"},
];
var timer,cnt=0;
//设置全局参数
timerTask();
//定时任务执行

setInterval(function(){
  timerTask();
},1000);

function timerTask() {
  // clearTimeout(timer);
  // timer= setTimeout(function() {
    // var nowTime=new Date().Format("HHmm");
    console.log(`第${cnt}次调用`);
    //第三次注释
    // var eventFiler=arrayEvent.filter(function(item){
    //   return item.eventTimer==nowTime && item.eventCnt!=0;
    // })
    // eventFiler.eventName
    // console.log(eventFiler.length);

    //第二次注释
    // if(eventFiler.length!=0){
    //   eval("eventFiler[0].eventName"); 
    // }
    

    // eventFiler=null;
    // // 计数器10万次归零
    if(cnt>10000){
      cnt=0;
      return false;
    }

    var mem = process.memoryUsage();
    var format = function(bytes) { 
      return (bytes/1024/1024).toFixed(2)+'MB'; 
    };
    console.log('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    cnt++;
    // timerTask();
  // },1000);
}

//自己进行自己的逻辑
//下载
function downloadBasic() { 
  console.log("执行下载");
  // basicFunc("downloadBasic");
}
//上传
function uploadBasic() { 
  console.log("执行上传");
  // basicFunc("uploadBasic");
}
//质检
function checkBasic() { 
  console.log("执行质检");
  // basicFunc("checkBasic");
}

//公有设置相应函数功能
function basicFunc(func) {
  var eventFiler=arrayEvent.map(function(item){
    return item.eventName;
  }).indexOf(func);
  console.log("执行一次清空次数："+eventFiler);
  arrayEvent[eventFiler].eventCnt=0;
}

// Date.prototype.Format = function(fmt) { //author: meizz
//   if (this == "Invalid Date") {
//       return "";
//   }
//   var o = {
//       "M+" : this.getMonth() + 1, //月份
//       "d+" : this.getDate(), //日
//       "H+" : this.getHours(), //小时
//       "m+" : this.getMinutes(), //分
//       "s+" : this.getSeconds(), //秒
//       "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
//       "S" : this.getMilliseconds()
//   //毫秒
//   };
//   if (/(y+)/.test(fmt))
//       fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
//               .substr(4 - RegExp.$1.length));
//   for ( var k in o)
//       if (new RegExp("(" + k + ")").test(fmt))
//           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
//                   : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
//   }