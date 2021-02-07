//几种类型
// 1、微信
// 2、自己app
// 3、别人app
// 4、IOS
//设备类型父类（）

var DeviceType=function(ServicePath)
{
	this.ServicePath=ServicePath;
}
var WXDevice=function(){
	this.intro="微信设备";
	this.OpenId="";
}
var MyAppDevice=function(){
	this.intro="自己App设备";
}
var OtherAppDevice=function(){
	this.intro="其他App设备";
}
var IOSDevice=function(){
	this.intro="Ios设备";
}
var OtherDevice=function(){
	this.intro="网页设备";
}

// 简单工厂(设备工厂类)
var DeviceFactory=function(name){
	switch (name){
		case 'WX':
			return new WXDevice();
		case 'MyApp':
			return new MyAppDevice();
		case 'OtherApp':
			return new OtherAppDevice();
		case 'IOS':
			return new IOSDevice();
		default:
			return new OtherDevice();
			break;
	}
}

//获取是否为微信浏览器
function getBrowserType(){
	
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return DeviceFactory('WX');
    }
	else if( ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1)
	{
		var sDeviceType=localStorage.getItem("DeviceType");
		if(sDeviceType=="MyApp")
		{
			return DeviceFactory('MyApp');
		}
		else
		{
			//第三方内嵌
			return DeviceFactory('OtherApp');
		}
    }
	else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))
	{
		//是IOS
		return DeviceFactory('IOS');
	}
	else
	{
		//是IOS
		return DeviceFactory('Other');
	}
}



