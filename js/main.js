var db = openDatabase('DZBP_DB', '1.0', 'DZBP_DB', null);
$(function(){
	//初始化加载下载进度弹出框
	if(window.location.href.indexOf("dzbp")!=-1||window.location.href.indexOf("dzbp_h")!=-1||window.location.href.indexOf("sysyy")!=-1){
		$("body").append('<div id="ShowDownloadBox"></div>');
		//加载下载进度条 2019-05-31
		$("#ShowDownloadBox").load("downloadprogress.html");
	}	
})

function onCallFunction(funcName) {
    try {
      // console.log("main onCallFunction:"+funcName);
      if (typeof(eval(funcName)) == "function") {
        eval(funcName+"();");
      }
    } catch (e) {
        return false;
    }
    return false;
}

//当前时间-传入时间的秒差
function secondBetween(sDateTime){
    var time1 = new Date(sDateTime);
    var time2 = new Date();
    var total = (time2.getTime()-time1.getTime())/1000;  //时间的秒差
    total = Math.abs(Math.floor(total));
    return total;
}
//两个传入时间的秒差
function StartEndSecondBetween(StartTime,EndTime){
    var time1 = new Date(StartTime);
    var time2 = new Date(EndTime);
    var total = (time2.getTime()-time1.getTime())/1000;  //时间的秒差
    total = Math.abs(Math.floor(total));
    return total;
}


//将内容转换后为Utf-8
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

var intPageTimeout=0;
var intAutoJumpTimeout=0;
var intRunSystemTimeout=0;

function jump(oUrl, id) {
   //进行确认是否进行处理
   // checkCloseFunction();
  //  if(androidClient.getValue("IsDownloading")=="true"){
	 //    androidClient.saveLog("正在下载数据，暂停跳页");
		// return false;
  //  }
   localStorage.setItem("PageHtml",oUrl);
   window.location.href=oUrl;
   if (id != ""){
    //AutoBackToHomePage true自动返回首页
       localStorage.setItem("AutoBackToHomePage","true");
   }
   else{
    //AutoBackToHomePage false不自动返回首页
       localStorage.setItem("AutoBackToHomePage","false");
   }
}

function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}



function GetAccountImg(url)
{
	return url+='?t=' + Math.random();
}
//json数据检验
function jsonChecker(json) {
	if ( !json.status ) dialog(json.msg);
	return json.status;
}
///*tab标签切换*/
//function tabs(tabTit, on, tabCon) {
//	$(tabCon).each(function() {
//		$(this).children().eq(0).show();
//	});
//	$(tabTit).each(function() {
//		$(this).children().eq(0).addClass(on);
//	});
//	$(tabTit).children().mousedown(function() {
//		$(this).addClass(on).siblings().removeClass(on);
//		var index = $(tabTit).children().index(this);
//		$(tabCon).children().eq(index).show().siblings().hide();
//		if ($(".on").text()=="刷卡登录")
//		{
//			//引用JQ设置焦点
//			$("#scanCard").attr("value", "");
//			$("#scanCard").focus().select();
//		}
//	});
//}
//格式化时间
Date.prototype.Format = function(fmt) { //author: meizz
if (this == "Invalid Date") {
    return "";
}
var o = {
    "M+" : this.getMonth() + 1, //月份
    "d+" : this.getDate(), //日
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
    "S" : this.getMilliseconds()
//毫秒
};
if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
for ( var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
}
//获取一周时间其中dateString为当天日期对照时间
//dateString=new Date().Format("yyyy-MM-dd");
function getWeekDay(dateString) {
    var dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;
    if (dateString.match(dateStringReg)) {
        var presentDate = new Date(dateString),
            today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

        return Array.from(new Array(7), function(val, index) {
            return formatDate(new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000));
        });

    } else {
        throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
    }

    function formatDate(date) {
        return new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).Format("yyyy-MM-dd") ;
    }
}
//返回毫秒时间差
function getSecondDiff(date1, date2) {
	var d1 = new Date(Date.parse(date1));
	var d2 = new Date(Date.parse(date2));
	var sec = d2.getTime() - d1.getTime();
	return sec;
}
//黄金分割
Math.gold = (Math.sqrt(5) - 1) / 2;
//显示错误提示
String.prototype.err = function(str) {
	return this.replace(/%s/g,str);
};
//去掉html标记
String.prototype.dropHTML = function() {
	return this.replace(/<[^>].*?>/g,"");
};
//去掉html标记并替换全角空格
String.prototype.dropFormatHTML = function() {
	return this.replace(/<[^>].*?>/g," ").replace(/　/g," ");
};

String.prototype.myReplace=function(f,e){//吧f替换成e
    var reg=new RegExp(f,"g"); //创建正则RegExp对象
    return this.replace(reg,e);
}

//转义特殊字符
String.prototype.format = function() {
	return this
		.replace(/"/g,"&quot;")
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
		.replace(/\n/g,"<br>");
};
//左截取字符串
String.prototype.left = function(n,str) {
	str = str != null ? str : "...";
	var rtn = this;
	if ( this.length > n ) rtn = this.slice(0,n) + str;
	return rtn;
};
//右截取字符串
String.prototype.right = function(n,str) {
	str = str != null ? str : "...";
	var rtn = this;
	if ( this.length > n ) rtn = str + this.slice(this.length - n);
	return rtn;
};
//二维数组合并
Array.prototype.joinBy = function(key,str) {
	var arr = new Array();
	$.each(this, function(i,item) {
		if ( item[key] != null ) arr.push(item[key]);
	} );
	return arr.join(str);
};
//时间戳格式化函数
function timeFormat(time,reg) {
	var times = "";
	if ( reg == "due" ) {
		var ago = now() - time;
		if ( ago / ( 3600 * 24 * 365 ) > 1 ) return parseInt(ago / ( 3600 * 24 * 365 )) + "年前";
		else if ( ago / ( 3600 * 24 * 30 ) > 1 ) return parseInt(ago / ( 3600 * 24 * 30 )) + "个月前";
		else if ( ago / ( 3600 * 24 * 7 ) > 1 ) return parseInt(ago / ( 3600 * 24 * 7 )) + "周前";
		else if ( ago / ( 3600 * 24 ) > 1 ) return parseInt(ago / ( 3600 * 24 )) + "天前";
		else if ( ago / 3600 > 1 ) return parseInt(ago / 3600) + "小时前";
		else if ( ago / 60 > 1 ) return parseInt(ago / 60) + "分钟前";
		else if ( ago > 1 ) return ago + "秒前";
		else return "刚刚";
		return times;
	}
	if ( reg == "after" ) {
		var after = time - now();
		var returnStr = "";
		if ( after / ( 3600 * 24 * 365 ) > 1 ) {
			returnStr += (parseInt(after / ( 3600 * 24 * 365 )) + "年");
			after = after % ( 3600 * 24 * 365 );
		}
		if ( after / ( 3600 * 24 * 30 ) > 1 ) {
			returnStr += (parseInt(after / ( 3600 * 24 * 30 )) + "个月");
			after = after % ( 3600 * 24 * 30 );
		}
		if ( after / ( 3600 * 24 * 7 ) > 1 ) {
			returnStr += (parseInt(after / ( 3600 * 24 * 7 )) + "周");
			after = after % ( 3600 * 24 * 7 );
		}
		if ( after / ( 3600 * 24 ) > 1 ) {
			returnStr += (parseInt(after / ( 3600 * 24 )) + "天");
			after = after % ( 3600 * 24 );
		}
		if ( after / 3600 > 1 ) {
			returnStr += (parseInt(after / 3600) + "小时");
			after = after % 3600;
		}
		if ( after / 60 > 1 ) {
			returnStr += (parseInt(after / 60) + "分");
			after = after % 60;
		}
		if ( after > 1 ) returnStr += (after + "秒");
		return returnStr;
	}
	reg = reg ? reg : "%Y-%m-%d %H:%i:%s";
	with ( new Date(parseInt(time) * 1000) ) {
		times = reg.replace(/%Y/g,getFullYear())
				   .replace(/%m/g,( getMonth() + 1 ).leading())
				   .replace(/%d/g,getDate().leading())
				   .replace(/%H/g,getHours().leading())
				   .replace(/%i/g,getMinutes().leading())
				   .replace(/%s/g,getSeconds().leading());
	}
	return times;
}
//是否是整数
function isInteger(obj) {
 return (obj | 0) === obj
}

//获取距离当前时间的几天的并返回时间
function delDay(dayNumber, date) {
	date = date ? date : new Date();
	var ms = dayNumber * (1000 * 60 * 60 * 24)
	var newDate = new Date(date.getTime() - ms);
	return newDate;
}
//windows 错误追踪 CN 2019-04-13
window.onerror = function(errorMessage,scriptURI,lineNumber,columnNumber,error)
{
    cpnsole.log("JS共通错误追踪errorMessage:"+errorMessage+"scriptURI:"+scriptURI+"lineNumber:"+lineNumber+"columnNumber:"+columnNumber+"error:"+error);
}
//windows 错误追踪 CN 2019-04-13
//共同js根据不同的职位去安排不同的图标
function getDutyIcon(name) {
    var names = {
        '拖地': function () {
            return 'tuodi';
        },
        '擦黑板': function () {
            return 'heiban';
        },
        '扫地': function () {
            return 'saodi';
        },
        '倒垃圾': function () {
            return 'daolaji';
        },
        '擦窗': function () {
            return 'chuangzi';
        },
        '值日': function () {
            return 'saodi';
        }
    }
    if (typeof names[name] !== 'function') {
        return false;
    }

    return names[name]();
}

//根据距离获取range
function getDistanceRange(distance) {
    var names = {
        '0.5米': function () {
            return '300';
        },
        '1.0米': function () {
            return '220';
        },
        '1.2米': function () {
            return '190';
        },
        '1.4米': function () {
            return '160';
        },
        '1.6米': function () {
            return '130';
        },
        '1.8米': function () {
            return '100';
        },
        '2.0米': function () {
            return '80';
        },
        '0米': function () {
             return '0';
        }
    }
    if (typeof names[distance] !== 'function') {
        return false;
    }

    return names[distance]();
}

//前补零
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
//校验是否连接可用
function CheckFunctionUrl(url,fn)
{
    $.ajax({
        url: url,
        type: 'GET',
        complete: function(response) {
            if((response.status == 404)||(response.status == 500)) {
                if (fn) fn.call();
                return false;
            }
            else {
                if (fn) fn.call();
                return true;
            }
        }
    });
}
//获取当前
//localImg 为本地图片路径
//webImg为服务器图片路径


//根据星期汉字转成星期英文对应
function changeWeek(name) {
    var names = {
        '星期一': function () {
            return 'Monday';
        },
        '星期二': function () {
            return 'Tuesday';
        },
        '星期三': function () {
            return 'Wednesday';
        },
        '星期四': function () {
            return 'Thursday';
        },
        '星期五': function () {
            return 'Friday';
        },
        '星期六': function () {
            return 'Saturday';
        },
        '星期日': function () {
            return 'Sunday';
        },
        'Monday': function () {
            return '星期一';
        },
        'Tuesday': function () {
            return '星期二';
        },
        'Wednesday': function () {
            return '星期三';
        },
        'Thursday': function () {
            return '星期四';
        },
        'Friday': function () {
            return '星期五';
        },
        'Saturday': function () {
            return '星期六';
        },
        'Sunday': function () {
            return '星期日';
        },
        '0': function () {
            return '星期日';
        },
        '1': function () {
            return '星期一';
        },
        '2': function () {
            return '星期二';
        },
        '3': function () {
            return '星期三';
        },
        '4': function () {
            return '星期四';
        },
        '5': function () {
            return '星期五';
        },
        '6': function () {
            return '星期六';
        }
    }
    if (typeof names[name] !== 'function') {
        return false;
    }

    return names[name]();
}
////获取当天星期
function timeToWeek() {
	var today = new Date();
	var ww = today.getDay();
	if(ww == 0) ww = "星期日";
	if(ww == 1) ww = "星期一";
	if(ww == 2) ww = "星期二";
	if(ww == 3) ww = "星期三";
	if(ww == 4) ww = "星期四";
	if(ww == 5) ww = "星期五";
	if(ww == 6) ww = "星期六";
   return ww;
}
//时间戳格式化String扩展
String.prototype.timeFormat = function(reg) {
	return timeFormat(this,reg);
};
//时间戳格式化Number扩展
Number.prototype.timeFormat = function(reg) {
	return timeFormat(this,reg);
};
//当前时间戳
function now() {
	return parseInt(new Date().getTime() / 1000);
}
//时间转时间戳
function strtotime(str) {
	if ( !str ) return "";
	var date = new Date(str);
	var time = date.getTime();
	return time / 1000;
}
//前导函数
function leading(str,figure,leader) {
	figure = figure ? figure : 2;
	leader = leader ? leader : 0;
	return ( leader.toString().repeat(figure) + str.toString() ).right(figure,"")
}
//前导String扩展
String.prototype.leading = function(figure,leader) {
	return leading(this,figure,leader);
};
//前导Number扩展
Number.prototype.leading = function(figure,leader) {
	return leading(this,figure,leader);
};
//重复函数
function repeat(str,n) {
	return new Array(n + 1).join(str);
}
//重复String扩展
String.prototype.repeat = function(n) {
	return repeat(this,n);
};
//重复Number扩展
Number.prototype.repeat = function(n) {
	return repeat(this,n);
};
//全角转换半角
function CtoH(val) {
	var str = val;
	var result = "";
	for ( var i = 0; i < str.length; i++ ) {
		if ( str.charCodeAt(i) == 12288 ) {
			result += String.fromCharCode(str.charCodeAt(i) - 12256);
			continue;
		}
		if ( str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375 ) result += String.fromCharCode(str.charCodeAt(i) - 65248);
		else result += String.fromCharCode(str.charCodeAt(i));
	}
	return result;
}
//微信基础处理函数
function htmlEncode(e){return e.replace(/&/g,"&amp;").replace(/ /g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br />").replace(/"/g,"&quot;")}function htmlDecode(e){return e.replace(/&#39;/g,"'").replace(/<br\s*(\/)?\s*>/g,"\n").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")}function parseParams(e){e==undefined&&(e=window.location.search);var t=e.replace(/^\?/,"").split("&"),n=0,r,i={},s,o,u;while((r=t[n++])!==undefined)s=r.match(/^([^=&]*)=(.*)$/),s&&(o=decodeURIComponent(s[1]),u=decodeURIComponent(s[2]),i[o]=u);return i}function parseUrl(e){var t=new RegExp("(http[s]{0,1}|ftp)://([a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+:_/<>]*)?([\\?a-zA-Z0-9\\.\\-~!@$%^&amp;*+?:_/<>=]*)?(#\\w+)?"),n=e.match(t);return n!=null?{protocol:n[1],domain:n[2],port:n[3],path:n[4],query_str:n[5],sharp:n[6]}:null}
function share_scene(link,scene_type) {
	var parse_link = parseUrl(link);
	if ( !parse_link ) return link;
	var query_obj = parseParams(parse_link["query_str"]);
	query_obj["scene"] = scene_type;
	var share_url = "http://" + parse_link["domain"] + parse_link["path"] + "?" + $.param(query_obj) + (parse_link["sharp"] ? parse_link["sharp"] : "");
	return share_url;
}
/*内置对象及功能扩展结束*/


//获取设备类型
var isMobile = false;
$.each(["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"], function(i,item) {
	if ( navigator.userAgent.indexOf(item) > 0 ) {
		isMobile = true;
		return false;
	}
} );

//获取是否为微信浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//jQuery 1.9以后兼容$.browser
if ( parseInt($.fn.jquery.replace(/\./g,"")) >= 190 ) {
	$.browser = new Object();
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
}

function dialog(msg, fn) {
    var html = '';
    if (isMobile) {
        html += '<div style="position:fixed;z-index:100000;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);">';
        html += '  <div style="position:absolute;width:90%;left:5%;background:#FFF;color:#222;border-radius:10px;box-shadow:2px 2px 10px #000;">';
        html += '    <div style="color:#cccccc;padding:5% 5% 0 5%;font-size:6vmin;line-height:10vmin;text-align:' + (msg.length > 20 ? "left" : "center") + ';">' + htmlEncode(msg) + '</div>';
        html += '    <div style="text-align:center;padding:3% 0 7% 0;">';
        html += '      <button style="padding:1% 6%;font-size:6vmin;background:#0099ff;color:#FFF;border:none;border-radius:5px;">确认</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    else {
        html += '<div style="position:fixed;z-index:100000;padding:0 10px;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);">';
        html += '  <div style="max-width:400px;margin:45% auto;background:#FFF;color:#222;border-radius:10px;box-shadow:2px 2px 10px #000;">';
        html += '    <div style="color:#cccccc;padding:20px 20px 0 20px;line-height:22px;text-align:' + (msg.length > 25 ? "left" : "center") + ';">' + htmlEncode(msg) + '</div>';
        html += '    <div style="text-align:center;padding:10px 0 20px 0;">';
        html += '      <button style="padding:3px 10px;background:#0099ff;color:#FFF;border:none;border-radius:5px;">确认</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    var obj = $(html).appendTo(document.body);
    var box = obj.children();
    var mt = ($(window).height() - box.outerHeight()) * (1 - Math.gold);
    box.css(isMobile ? "top" : "margin-top", mt);
    obj.find("a").click(function () {
        obj.fadeOut(function () {
            $(this).remove();
        });
    });
    obj.find("button").click(function () {
        obj.fadeOut(function () {
            $(this).remove();
        });
        if (fn) fn.call();
    });
}
//确认框
function confirm(msg, fn) {
    var html = '';
    if (isMobile) {
//      html += '<div style="position:fixed;z-index:100000;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);">';
//      html += '  <div style="position:absolute;width:70%;left:15%;background:#FFF;color:#222;border-radius:10px;box-shadow:2px 2px 10px #000;">';
//      html += '    <div style="padding:5% 5% 0 5%;font-size:6vmin;line-height:10vmin;text-align:' + (msg.length > 20 ? "left" : "center") + ';">' + htmlEncode(msg) + '</div>';
//      html += '    <div style="text-align:center;padding:3% 0 7% 0;">';
//      html += '      <button style="padding:1% 6%;font-size:6vmin;background:#0099ff;color:#FFF;border:none;border-radius:5px;">确认</button>';
//      html += '      <button style="padding:1% 6%;font-size:6vmin;background:#0099ff;color:#FFF;border:none;border-radius:5px;margin-left:5%;">取消</button>';
//      html += '    </div>';
//      html += '  </div>';
//      html += '</div>';
        html += '<div style="position:fixed;z-index:100000;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);">';
		html += '    <div style="position: absolute;width: 480px;height: 240px;left: 0;right: 0;top: 0;bottom: 0;margin: auto;background: #FFF;color: #222;border-radius: 10px;box-shadow: 2px 2px 10px #000;">';
		html += '		<div style="padding: 10px 0;font-size: 1.6pc;line-height: 40px;position: relative;height: 140px;box-sizing: border-box;margin-top:10px;">';
		html += '			<span style="position: absolute;top: 50%;transform: translate(0, -50%);text-align:' + (msg.length > 20 ? "left" : "center") + ';display: block;font-size: 1.4pc;width: 100%;padding: 0 20px;box-sizing: border-box;">' + htmlEncode(msg) + '</span>';
		html += '		</div>';
		html += '        <div style="text-align:center;padding:3% 0 7% 0;">';
		html += '			<button style="padding: 14px 50px;font-size: 1.4pc;background: #0099ff;color: #FFF;border: none;border-radius: 5px;">确认</button>';
		html += '			<button style="padding: 14px 50px;font-size: 1.4pc;background: #0099ff;color: #FFF;border: none;border-radius: 5px;margin-left: 60px;">取消</button>';
		html += '        </div>';
		html += '    </div>';
		html += '</div>';
    }
    else {
        html += '<div style="position:fixed;z-index:100000;padding:0 10px;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);">';
        html += '  <div style="max-width:400px;margin:20% auto;background:#FFF;color:#222;border-radius:10px;box-shadow:2px 2px 10px #000;">';
        html += '    <div style="padding:20px 20px 0 20px;line-height:22px;text-align:' + (msg.length > 25 ? "left" : "center") + ';">' + htmlEncode(msg) + '</div>';
        html += '    <div style="text-align:center;padding:10px 0 20px 0;">';
        html += '      <button style="padding:3px 10px;background:#0099ff;color:#FFF;border:none;border-radius:5px;">确认</button>';
        html += '      <button style="padding:3px 10px;background:#0099ff;color:#FFF;border:none;border-radius:5px;margin-left:10px;">取消</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    var obj = $(html).appendTo(document.body);
        var box = obj.children();
        var mt = ($(window).height() - box.outerHeight()) * (1 - Math.gold);
        box.css(isMobile ? "top" : "margin-top", mt);
        obj.find("button").click(function () {
            if($(this).text()=="确认")
            {
                obj.fadeOut(function () {
                    $(this).remove();
                });
                var index = $(this).index();
                if (fn) fn.call(window, !index);
            }
            else
            {
                obj.fadeOut(function () {
                    $(this).remove();
                });
            }
        });

        obj.find("a").click(function () {
            obj.fadeOut(function () {
                $(this).remove();
            });
            var index = $(this).index();
            if (fn) fn.call(window, 0);
        });
}

//微信基础处理函数
function htmlEncode(e) { return e.replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />").replace(/"/g, "&quot;") } function htmlDecode(e) { return e.replace(/&#39;/g, "'").replace(/<br\s*(\/)?\s*>/g, "\n").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&") } function parseParams(e) { e == undefined && (e = window.location.search); var t = e.replace(/^\?/, "").split("&"), n = 0, r, i = {}, s, o, u; while ((r = t[n++]) !== undefined) s = r.match(/^([^=&]*)=(.*)$/), s && (o = decodeURIComponent(s[1]), u = decodeURIComponent(s[2]), i[o] = u); return i } function parseUrl(e) { var t = new RegExp("(http[s]{0,1}|ftp)://([a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+:_/<>]*)?([\\?a-zA-Z0-9\\.\\-~!@$%^&amp;*+?:_/<>=]*)?(#\\w+)?"), n = e.match(t); return n != null ? { protocol: n[1], domain: n[2], port: n[3], path: n[4], query_str: n[5], sharp: n[6] } : null }
function share_scene(link, scene_type) {
    var parse_link = parseUrl(link);
    if (!parse_link) return link;
    var query_obj = parseParams(parse_link["query_str"]);
    query_obj["scene"] = scene_type;
    var share_url = "http://" + parse_link["domain"] + parse_link["path"] + "?" + $.param(query_obj) + (parse_link["sharp"] ? parse_link["sharp"] : "");
    return share_url;
}

//提示
function cue(msg,fn) {
var html =  '<div style="position:fixed;z-index:100000;top:0;right:0;bottom:0;left:0;background-color:rgba(244,244,244,0.05);">';
	html += '  	<div style="position:absolute;background:rgba(111, 111, 111, 1);color:#ffffff;padding:10px 20px;border-radius:30px;box-sizing:border-box;border:1px #CACACA;box-shadow:0px 2px 5px #333;min-width:300px;min-height:40px;font:18px/24px 微软雅黑;text-align:center;opacity:0;">' + htmlEncode(msg) + '</div>';
	html += '</div>';
	var obj = $(html).appendTo(document.body);
	var box = obj.children();
	var ml = ($(window).width() - box.outerWidth()) / 2;
	var mt =0;

	if (isMobile) {
		mt = ($(window).height() - box.outerHeight()) * (0.9);
    }
    else
    {
		mt=($(window).height() - box.outerHeight()) * (1-Math.gold);
    }

	//此处设置手机提示显示位置 Math.gold 为黄金比例位置
//	var mt = ($(window).height() - box.outerHeight()) * (1-Math.gold);
//	var mt = ($(window).height() - box.outerHeight()) * (0.9);
	var timer;
	box.css3("left:" + ml + "px;top:" + (mt + 10) + "px").animate( {
		top : mt,
		opacity : 1
	}, function() {
		timer = setTimeout( function() {
			box.animate( {
				top : mt - 10,
				opacity : 0
			}, function() {
				obj.remove();
				if ( fn ) fn.call();
			} );
		}, 2000 );
	} );

	obj.click( function() {
		clearTimeout(timer);
		$(this).remove();
		if ( fn ) fn.call();
	} );
}

//提示说明
function helpInfo(title,msg,fn) {
	$("<link>").attr({ 
		rel: "stylesheet",
		type: "text/css",
		href: "../css/main.css"
	}).appendTo("head");
	var html = "";
	html += '<div class="DescriptionZDC"></div>';
	html += '<div class="DescriptionDocumentMod">';
	html += '	<div class="DescriptionDocument">';
	html += '		<div class="DocumentTitle">';
	html += '			<p class="TitleText"><span>'+title+'</span>说明</p>';
	html += '		</div>';
	html += '		<div class="DocumentBox">';
	html += '			<p class="DocumentText">'+msg+'</p>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	var obj = $(html).appendTo(document.body);
	var box = obj.children();
	obj.on("touchend", function(event) {
		event.preventDefault();
		obj.remove();
		if ( fn ) fn.call();
	});
}

//此处设置样式
//Loading
$( function() {
	$.keyframes("keboy-bouncedelay", {
		0 : "transform:scale(0.0)",
		40 : "transform:scale(1.0)",
		80 : "transform:scale(0.0)",
		100 : "transform:scale(0.0)"
	} );
	$.css3( {
		".keboy-loading" : "margin:0 auto;width:30px;height:30px;position:relative;",
		".keboy-loading-container1 > div,.keboy-loading-container2 > div,.keboy-loading-container3 > div" : "width:9px;height:9px;background-color:#FFF;border-radius:100%;position:absolute;animation:keboy-bouncedelay 1.2s infinite ease-in-out both;",
		".keboy-loading .keboy-loading-container" : "position:absolute;width:100%;height:100%;",
		".keboy-loading-container2" : "transform:rotateZ(45deg);",
		".keboy-loading-container3" : "transform:rotateZ(90deg);",
		".keboy-loading-circle1" : "top:0;left:0;",
		".keboy-loading-circle2" : "top:0;right:0;",
		".keboy-loading-circle3" : "right:0;bottom:0;",
		".keboy-loading-circle4" : "left:0;bottom:0;",
		".keboy-loading-container2 .keboy-loading-circle1" : "animation-delay:-1.1s;",
		".keboy-loading-container3 .keboy-loading-circle1" : "animation-delay:-1.0s;",
		".keboy-loading-container1 .keboy-loading-circle2" : "animation-delay:-0.9s;",
		".keboy-loading-container2 .keboy-loading-circle2" : "animation-delay:-0.8s;",
		".keboy-loading-container3 .keboy-loading-circle2" : "animation-delay:-0.7s;",
		".keboy-loading-container1 .keboy-loading-circle3" : "animation-delay:-0.6s;",
		".keboy-loading-container2 .keboy-loading-circle3" : "animation-delay:-0.5s;",
		".keboy-loading-container3 .keboy-loading-circle3" : "animation-delay:-0.4s;",
		".keboy-loading-container1 .keboy-loading-circle4" : "animation-delay:-0.3s;",
		".keboy-loading-container2 .keboy-loading-circle4" : "animation-delay:-0.2s;",
		".keboy-loading-container3 .keboy-loading-circle4" : "animation-delay:-0.1s;"
	} );
} );

var loading = {
	show : function() {
		var html = '<div style="position:fixed;z-index:1000000;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);"></div>';
		this.box = $(html).appendTo(document.body).show();
		html = '<div class="keboy-loading">';
		html += '  <div class="keboy-loading-container keboy-loading-container1">';
		html += '    <div class="keboy-loading-circle1"></div>';
		html += '    <div class="keboy-loading-circle2"></div>';
		html += '    <div class="keboy-loading-circle3"></div>';
		html += '    <div class="keboy-loading-circle4"></div>';
		html += '  </div>';
		html += '  <div class="keboy-loading-container keboy-loading-container2">';
		html += '    <div class="keboy-loading-circle1"></div>';
		html += '    <div class="keboy-loading-circle2"></div>';
		html += '    <div class="keboy-loading-circle3"></div>';
		html += '    <div class="keboy-loading-circle4"></div>';
		html += '  </div>';
		html += '  <div class="keboy-loading-container keboy-loading-container3">';
		html += '    <div class="keboy-loading-circle1"></div>';
		html += '    <div class="keboy-loading-circle2"></div>';
		html += '    <div class="keboy-loading-circle3"></div>';
		html += '    <div class="keboy-loading-circle4"></div>';
		html += '  </div>';
		html += '</div>';
		this.loading = $(html).appendTo(this.box).css("marginTop",( $(window).height() - 30 ) / 2 + "px").show();
		return this.box;
	},
	hide : function() {
		this.loading.remove();
		this.box.remove();
	}
};


/*CSS3扩展*/
	//CSS3字典(待完善)
var css3Dictionary = {
	keyframes : ["webkit","moz","o"],
	animation : ["webkit","moz","o"],
	transform : ["webkit","moz","ms","o"],
	perspective : ["webkit"],
	transition : ["webkit","moz","o"],
	column : ["webkit","moz"]
};
//jQuery CSS3插件扩展
$.fn.extend( {
	//fn.css3替代方法
	css3 : function(name,value) {
		var that = this;
		if ( $.type(name) == "string" ) {
			if ( value ) setCSS3(name,value);
			else {
				if ( name.indexOf(":") >= 0 ) {
					$.each(name.split(";"), function(i,props) {
						var props = $.trim(props);
						if ( props == "" ) return true;
						var prop = props.split(":")[0];
						var propValue = props.split(":")[1];
						setCSS3(prop,propValue);
					} );
				}
				else return this.css(name);
			}
		}
		else if ( $.type(name) == "object" ) $.each(name, function(key,item) {
			setCSS3(key,item);
		} );
		function setCSS3(key,value) {
			var css3 = key.split("-")[0];
			if ( css3 in css3Dictionary ) {
				$.each(css3Dictionary[css3], function(i,compatible) {
					that.css("-" + compatible + "-" + key,value);
				} );
			}
			that.css(key,value);
		}
		return this;
	}
} );
/*CSS3扩展结束*/

//jQuery CSS3插件扩展
$.extend( {
	//自定义CSS3样式
	css3 : function(css3) {
		var css = '<style type="text/css">\n';
		$.each(css3, function(name,value) {
			css += name + " {"
			if ( $.type(value) == "string" ) $.each(value.split(";"), function(i,props) {
				props = $.trim(props);
				if ( props == "" ) return true;
				var prop = props.split(":")[0];
				var propValue = props.split(":")[1];
				var propName = prop.split("-")[0];
				if ( propName in css3Dictionary ) {
					$.each(css3Dictionary[propName], function(i,compatible) {
						css += "-" + compatible + "-" + prop + ":" + propValue + ";";
					} );
				}
				css += prop + ":" + propValue + ";";
			} );
			else if ( $.type(value) == "object" ) $.each(value, function(prop,propValue) {
				var propName = prop.split("-")[0];
				if ( propName in css3Dictionary ) {
					$.each(css3Dictionary[propName], function(i,compatible) {
						css += "-" + compatible + "-" + prop + ":" + propValue + ";";
					} );
				}
				css += prop + ":" + propValue + ";";
			} );
			css += "}\n"
		} );
		css += "</style>\n"
		$("head").append(css);
		return this;
	},
	//自定义动画样式
	keyframes : function(name,animation) {
		var animate = "";
		$.each(animation, function(per,value) {
			animate += "	" + per + "% {";
			if ( $.type(value) == "string" ) $.each(value.split(";"), function(i,props) {
				props = $.trim(props);
				if ( props == "" ) return true;
				var prop = props.split(":")[0];
				var propValue = props.split(":")[1];
				var propName = prop.split("-")[0];
				if ( propName in css3Dictionary ) {
					$.each(css3Dictionary[propName], function(i,compatible) {
						animate += "-" + compatible + "-" + prop + ":" + propValue + ";";
					} );
				}
				animate += prop + ":" + propValue + ";";
			} );
			else if ( $.type(value) == "object" ) $.each(value, function(prop,propValue) {
				var propName = prop.split("-")[0];
				if ( propName in css3Dictionary ) {
					$.each(css3Dictionary[propName], function(i,compatible) {
						animate += "-" + compatible + "-" + prop + ":" + propValue + ";";
					} );
				}
				animate += prop + ":" + propValue + ";";
			} );
			animate += "}\n";
		} );
		var css = '<style type="text/css">\n';
		$.each(css3Dictionary.keyframes, function(i,compatible) {
			css += "@-" + compatible + "-keyframes " + name + " {\n";
			css += animate;
			css += "}\n";
		} );
		css += "@keyframes " + name + " {\n";
		css += animate;
		css += "}\n";
		css += "</style>\n"
		$("head").append(css);
		return this;
	}
} );
/*CSS3扩展结束*/

/*jQuery系统插件扩展*/
$.extend( {
	//滑动触发距离
	swipeStep : 30,
	//按住触发时间
	holdTime : 750,
	//双触触发时间
	dblTime : 300,
	//滑动触发时间
	swipeTime : 1000,
	//资源加载
	loading : function(resource,callback) {
		var that = this;
		var data = new Object();
		data.quantity = resource.length;
		data.loaded = 0;
		if ( $.type(callback) == "function" ) callback = {
			before : $.noop,
			loading : $.noop,
			complete : callback
		};
		else if ( $.type(callback) == "object" ) {
			if ( !callback.before ) callback.before = $.noop;
			if ( !callback.loading ) callback.loading = $.noop;
			if ( !callback.complete ) callback.complete = $.noop;
		}
		if ( callback.before ) callback.before.call(this,data);
		var img = new Array();
		$.each(resource, function(i,src) {
			img[i] = new Image();
			img[i].src = src;
			if ( img[i].complete ) loadOne(img[i],i);
			img[i].onload = function() {
				loadOne(this,i);
			};
		} );
		function loadOne(image,i) {
			if ( img[i].isComplete ) return;
			img[i].isComplete = true;
			data.loaded++;
			if ( callback.loading ) callback.loading.call(image,data);
			if ( data.loaded == data.quantity ) {
				if ( callback.complete ) callback.complete.call(that,data);
			}
		}
		return this;
	}
});

/*jQuery系统插件扩展结束*/

/*jQuery系统插件扩展结束*

 */
////返回到首页
//function returnIndex()
//{
//    window.location.href="index.html";
//}
/*jQuery系统插件扩展结束*/
function CurentWeek()
{
	var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var now = new Date();
	return dayNames[now.getDay()];
}
function nextWeek()
{
    var nextdayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var nextnow = new Date();
    if(nextdayNames.length ==7){
      return nextdayNames[0];
    }
	return nextdayNames[nextnow.getDay()+1];
}

/**
 * [Queue]
 * @param {[Int]} size [队列大小]
 */
function Queue(size) {
    var list = [];

    //向队列中添加数据
    this.push = function(data) {
        if (data==null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (size != null && !isNaN(size)) {
            if (list.length == size) {
                this.pop();
            }
        }
        list.unshift(data);
        return true;
    }

    //从队列中取出数据
    this.pop = function() {
    	if(list.length==0)
    	{
    		return false;
    	}
    	else
    	{
	        return list.pop();
    	}
    }

    //返回队列的大小
    this.size = function() {
        return list.length;
    }

    //返回队列的内容
    this.quere = function() {
        return list;
    }
}
//共通时钟函数--开始
function tick() {
	var today = new Date();
	showLocale(today);
	var Timer = setTimeout(function(){
        tick();
    },1000);
}

function showLocale(objD) {
	var str, colorhead, colorfoot;
	var yy = objD.getYear();
	if(yy < 1900) yy = yy + 1900;
	var MM = objD.getMonth() + 1;
	if(MM < 10) MM = '0' + MM;
	var dd = objD.getDate();
	if(dd < 10) dd = '0' + dd;
	var hh = objD.getHours();
	if(hh < 10) hh = '0' + hh;
	var mm = objD.getMinutes();
	if(mm < 10) mm = '0' + mm;
	var ss = objD.getSeconds();
	if(ss < 10) ss = '0' + ss;
	var ww = objD.getDay();
	if(ww == 0) ww = "星期日";
	if(ww == 1) ww = "星期一";
	if(ww == 2) ww = "星期二";
	if(ww == 3) ww = "星期三";
	if(ww == 4) ww = "星期四";
	if(ww == 5) ww = "星期五";
	if(ww == 6) ww = "星期六";
	$("#ShowIndexTime").text(hh + ":" + mm+":"+ss);
	$("#ShowIndexDate").html(yy + "-" + MM + "-" + dd);
	$("#ShowIndexWeek").html(ww);
}
