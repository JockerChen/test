
//连接系统类与其他类没有关系
var LinkSystemClass=function(ServerPathInfo,ControlNoInfo){
	if(!!ServerPathInfo)
	{
		this.ServerIp=ServerPathInfo;
		localStorage.setItem("ServerPath",ServerPathInfo);
		localStorage.setItem("ServerIp", ServerPathInfo + "ashx/dzbp/");
	}
	if(!!ControlNoInfo)
	{
		this.ControlNoInfo=ControlNoInfo;
		localStorage.setItem("ControlerNo",ControlNoInfo);
		localStorage.setItem("ControlNo",ControlNoInfo);
	}
	this.Model="";
}
//设置控制器号和服务器地址
LinkSystemClass.prototype.changeServerPath=function(ServerPathInfo){
	if(!!ServerPathInfo)
	{
		ServerPathInfo=ServerPathInfo.replace(' ', '').replace(' ', '').replace(' ', '').toLowerCase();
		if(ServerPathInfo.substr(0,7)!="http://")
		{
			ServerPathInfo="http://"+ServerPathInfo;
		}
		if (ServerPathInfo.substr(ServerPathInfo.length-1,1)!='/')
		{
			ServerPathInfo=ServerPathInfo+'/';
		}
		this.ServerIp=ServerPathInfo;
		localStorage.setItem("ServerIp", ServerPathInfo + "ashx/dzbp/");
        localStorage.setItem("ImageIp", ServerPathInfo);
        localStorage.setItem("ServerPath", ServerPathInfo);
	}
	return this;
}
LinkSystemClass.prototype.changeControlNo=function(ControlNoInfo){
	if(!!ControlNoInfo)
	{
		// androidClient.setValue("ControlNo", ControlNoInfo);
		// androidClient.setControlNo(ControlNoInfo);
		this.ControlNoInfo=ControlNoInfo;
		localStorage.setItem("ControlerNo",ControlNoInfo);
		localStorage.setItem("ControlNo",ControlNoInfo);
	}
	return this;
}
LinkSystemClass.prototype.changeModel=function(ModelInfo){
	if(!!ModelInfo)
	{
		this.Model=ModelInfo;
		localStorage.setItem("EnterModel",ModelInfo);
	}
	return this;
}

//第一步
var strServerIp=localStorage.getItem("ServerPath");
var strControlNo=localStorage.getItem("ControlNo");
//运行系统数组操作
var runArray=["ModelSel","GetFunctionInfo","ShowIndexSetting","RunPage"];
// console.log(runArray.shift());
// console.log(runArray);
var ReadCardPort;
var ReadCardPort_Second;
var OtherPort;
var systemSetinfo;
//创建对象
var linkSystemClass=new LinkSystemClass(strServerIp,strControlNo); 

$(function(){
	var method= runArray.shift();
	console.log("模式："+method)
	eval(method+"();");
	// GetFunctionInfo();
	//保存系统参数（保存系统参数）
    $('#btnSaveOption').on("click",function(event){
        event.preventDefault();//阻止浏览器默认事件
        saveOption();
    })
	//本地模式保存按钮
	$('#LocalModel').on("click",function(){
		var sControlNo=$('#LocalControllerNo').val();
		var sServerPath=$('#LocalServerPath').val();
		linkSystemClass.changeControlNo(sControlNo).changeServerPath(sServerPath).changeModel("本地模式");
		$('#EnterModel').hide();
		var method= runArray.shift();
		eval(method+"();");
	})
	//云模式保存按钮
	$('#CloudModel').on("click",function(){
		var sControlNo=$('#CloudControllerNo').val();//云模式控制号码
		//此处获取学校对应的服务器地址(第一处修改，服务器地址是通过学校信息进行获取的。)
		var sServerPath="http://www.56kad.com/dzbptgys/";
		linkSystemClass.changeControlNo(sControlNo).changeServerPath(sServerPath).changeModel("云模式");
		$('#EnterModel').hide();
		var method= runArray.shift();
		eval(method+"();");
	})
	//点击保存按钮功能
	$('#CloudModel').on("click",function(){
		var sControlNo=$('#CloudControllerNo').val();//云模式控制号码
		//此处获取学校对应的服务器地址
		var sServerPath="http://www.56kad.com/dzbptgys/";
		linkSystemClass.changeControlNo(sControlNo).changeServerPath(sServerPath).changeModel("云模式");
		$('#EnterModel').hide();
		var method= runArray.shift();
		eval(method+"();");
	})
	//进入系统
	$('#btnRunSystem').on("click",function(){
		var method= runArray.shift();
		console.log("模式："+method)
		eval(method+"();");
	})
})
//获取服务相关信息
function GetFunctionInfo()
{
    var strServerIp=localStorage.getItem("ServerPath");
    var strControlNo=localStorage.getItem("ControlNo");
    if (!!strServerIp && !!strControlNo)
    {
        $.ajax({
            type: "POST",
            url: strServerIp + "ashx/DZBP/SController.ashx",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: { action: "getfunctioninfo", ControlNo: strControlNo, time: Math.random()},
            dataType: 'json',
            timeout: 1000,
            success: function (data) {
                var strFunctionType="";
                var strQRCodeTime="";
                var strFunctionStyle="";
                if (data.length>0)
                {
                    console.log("data:"+data[0]);
                    systemSetinfo=new systemSet("ZK-R322A",data[0]);
					//设置控制器和设备号  开始
					// systemSetinfo.SetControlerNo(strControlNo);
					// systemSetinfo.SetServerPath(strServerIp);
					//设置控制器和设备号  结束
					// console.log(systemSetinfo.ControlerNo);		//系统设置设置已经好的控制器
					// console.log(systemSetinfo.ServerPath);		//服务器路径
                    console.log("BindType:"+systemSetinfo.systemBaseInfoClass.BindType);
                    console.log("FunctionType:"+systemSetinfo.systemBaseInfoClass.FunctionType);
                    console.log("FunctionStyle:"+systemSetinfo.systemBaseInfoClass.FunctionStyle);
                    console.log("ReadCardPort:"+systemSetinfo.readCardPortCls.ReadCardPort);
                    //生成对应的本地存储
                    systemSetinfo.creatlocalStorage(systemSetinfo.systemBaseInfoClass);
                    systemSetinfo.creatlocalStorage(systemSetinfo.readCardPortCls);
                    systemSetinfo.creatlocalStorage(systemSetinfo.signClass);
                    systemSetinfo.creatlocalStorage(systemSetinfo.alarmClass);
                    systemSetinfo.creatlocalStorage(systemSetinfo.faceClass);
					//已经进行模式选择
					eval(runArray.shift()+"();");
                }
                else
                {
                    //如果没有创建对象的话（创建一个空对象）
                }
            },
            error: function(xhr, type, errorThrown) {
                //AJAX调用失败
				console.log("strServerIp:"+strServerIp);
            }
        });
    }
    else
    {
        console.log("strServerIp:"+strServerIp);
    }
}

//串口类
var ReadCardPortCls=function(cpuName)
{
    var that=this;
    //构造器
    //构造函数中通过传入的职位特征来设置相应的职位以及描述
    (function(cpuName,that){
        switch (cpuName){
            case 'ZK-R322':
                that.ReadCardPort="/dev/ttyS1";
                that.ReadCardBaudRate="9600";
                that.ReadCardPort_Second="无";
                that.ReadCardBaudRate_Second="9600";
                that.OtherPort="无";
                that.OtherBaudRate="9600";
                break;
            case "ZK-R322A":
            case "ZK-R329":
                that.ReadCardPort="/dev/ttyS1";
                that.ReadCardBaudRate="19200";
                that.ReadCardPort_Second="无";
                that.ReadCardBaudRate_Second="9600";
                that.OtherPort="无";
                that.OtherBaudRate="9600";
                break;
            case 'K2':
                that.ReadCardPort="/dev/ttyS2";
                that.ReadCardBaudRate="9600";
                that.ReadCardPort_Second="无";
                that.ReadCardBaudRate_Second="9600";
                that.OtherPort="无";
                that.OtherBaudRate="9600";
                break;
            default:
                that.ReadCardPort="/dev/ttyS3";
                that.ReadCardBaudRate="9600";
                that.ReadCardPort_Second="无";
                that.ReadCardBaudRate_Second="9600";
                that.OtherPort="无";
                that.OtherBaudRate="9600";
                break;
        }
    })(cpuName,that);
}

//更换串口设置
ReadCardPortCls.prototype.changeInfo=function(param){
    if(!!param.readCardPort) this.ReadCardPort=param.readCardPort;
    if(!!param.readCardBaudRate) this.ReadCardBaudRate=param.readCardBaudRate;
    if(!!param.readCardPort_Second) this.ReadCardPort_Second=param.readCardPort_Second;
    if(!!param.readCardBaudRate_Second) this.ReadCardBaudRate_Second=param.readCardBaudRate_Second;
    if(!!param.otherPort) this.OtherPort=param.otherPort;
    if(!!param.otherBaudRate) this.OtherBaudRate=param.otherBaudRate;
}

//系统设置由串口设置、系统基本配置信息、签到信息设置、一键报警设置
var systemSet=function(cpuname,jsonInfo)
{
    var _systemSet=new systemInfo();
    _systemSet.readCardPortCls=new ReadCardPortCls(cpuname);
    _systemSet.systemBaseInfoClass=new SystemBaseInfoClass(jsonInfo);
    _systemSet.signClass=new SignClass(jsonInfo);
    _systemSet.alarmClass=new AlarmClass(jsonInfo);
    _systemSet.faceClass=new FaceClass(jsonInfo);
    return _systemSet;
}
//系统设置基础设置默认选项
var  SystemBaseInfoClass =function (param)
{
    //功能类型
    this.FunctionType=param.FunctionType && param.FunctionType || "电子班牌";
    //功能样式
    this.FunctionStyle=param.FunctionStyle && param.FunctionStyle || "默认样式";
    //是否播放声音
    this.EnablePlaySound=param.EnablePlaySound && param.EnablePlaySound || "是";
    //是否自动跳页
    this.EnableAutoJump=param.EnableAutoJump && param.EnableAutoJump || "是";
    //设备名称
    this.f_ControllerName=param.f_ControllerName && param.f_ControllerName || "";
    //绑定类型(需要修改)
    this.BindType=param.deptname && "教室" || "班级";
    //倒计时名称
    this.CountDownName=param.DZBP_CountDownName && param.DZBP_CountDownName || "暂无";
    //倒计时时间(需要修改)
    this.CountDownDate=param.DZBP_CountDownDate && param.DZBP_CountDownDate || "暂无";
    //下载时间
    this.DownloadDataTime=param.DownloadDataTime && param.DownloadDataTime || "";
    //更新时间
    this.UploadDataTime=param.UploadDataTime && param.UploadDataTime || "";
    //是否实时上传照片
    this.EnableRealTimeUpload=param.EnableRealTimeUpload && param.EnableRealTimeUpload || "是";
    //返回首页周期
    this.BackHomePageCycle=param.BackHomePageCycle && param.BackHomePageCycle || "60";
    //第三方作为首页链接
    this.ThirdIndexUrl=param.OtherURL && param.OtherURL || "";
    //第三方作为首页名称
    this.ThirdIndexName="首页";
}
//更改基础设置配置信息
SystemBaseInfoClass.prototype.changeInfo=function(param){
    if(!!param.readCardPort) this.ReadCardPort=param.ReadCardPort;
    if(!!param.readCardBaudRate) this.ReadCardBaudRate=param.ReadCardBaudRate;
    if(!!param.readCardPort_Second) this.ReadCardPort_Second=param.ReadCardPort_Second;
    if(!!param.readCardBaudRate_Second) this.ReadCardBaudRate_Second=param.ReadCardBaudRate_Second;
    if(!!param.otherPort) this.OtherPort=param.OtherPort;
    if(!!param.otherBaudRate) this.OtherBaudRate=param.OtherBaudRate;
}

//人脸识别功能
var  FaceClass =function (param)
{
    //是否人脸
    this.CheckFace=param.CheckFace && param.CheckFace || "是";
    //是否活体
    this.Livingbody=param.Livingbody && param.Livingbody || "否";
    //人脸识别阈值
    this.FaceScore=param.FaceScore && param.FaceScore || "75";
    //人脸识别角度
    this.FaceASF=param.FaceASF && param.FaceASF || "0";
    //人脸识别距离
    this.FaceDistance=param && param.FaceDistance || "0";
    //人脸是否保存log
    this.FaceSaveLog=param.FaceSaveLog && param.FaceSaveLog || "否";
    //摄像头方向
    this.CameraOrientation=param.CameraOrientation && param.CameraOrientation || "0";
    //屏幕方向
    this.ScreenRotation=param.ScreenRotation && param.ScreenRotation || "0";
    //抓拍方向
    this.SnapASF=param.SnapASF && param.SnapASF || "0";
	//摄像头水平镜像
	this.CameraImageX=param.CameraImageX && param.CameraImageX || "是";
	//摄像头垂直镜像
	this.CameraImageY=param.CameraImageY && param.CameraImageY || "是";	
	//识别框水平镜像
	this.FaceImageX=param.FaceImageX && param.FaceImageX || "是";
	//识别框垂直镜像	
	this.FaceImageY=param.FaceImageY && param.FaceImageY || "是";
	//文字进行镜像
	this.TextImageX=param.TextImageX && param.TextImageX || "是";
	
}
//更改人脸设置配置信息
FaceClass.prototype.changeInfo=function(param){
	this.CheckFace=param.CheckFace && param.CheckFace || "是";	
	this.Livingbody=param.Livingbody && param.Livingbody || "是";	
	this.ScreenRotation=param.ScreenRotation && param.ScreenRotation || "0";
	this.FaceScore=param.FaceScore && param.FaceScore || "75";
	// this.FaceDistance=param.FaceDistance && param.FaceDistance || "0";
	this.FaceSaveLog=param.FaceSaveLog && param.FaceSaveLog || "否";	
	this.CameraOrientation=param.CameraOrientation && param.CameraOrientation || "0";		
	this.FaceASF=param.FaceASF && param.FaceASF || "0";		
	this.SnapASF=param.SnapASF && param.SnapASF || "0";
	this.CameraImageX=param.CameraImageX && param.CameraImageX || "是";
	this.CameraImageY=param.CameraImageY && param.CameraImageY || "是";	
	this.FaceImageX=param.FaceImageX && param.FaceImageX || "是";
	this.FaceImageY=param.FaceImageY && param.FaceImageY || "是";
	this.FaceScore=param.FaceScore && param.FaceScore || "75";
}
//签到功能
var SignClass =function (param)
{
    //是否签到
    this.EnableSign=param.EnableSign && param.EnableSign || "是";
    //签到识别方式
    this.CheckSignType=param.CheckSignType && param.CheckSignType || "否";
    //首页签到类型
    this.IndexSignType=param.IndexSignType && param.IndexSignType || "是";
    //是否在线签到
    this.EnableOnlineSign=param.EnableOnlineSign && param.EnableOnlineSign || "是";
    //是否签到显示课表
    this.EnableClassSelection=param.EnableClassSelection && param.EnableClassSelection || "其他";
    //签到是否推送
    this.Attendancetopush=param.Attendancetopush && param.Attendancetopush || "否";
}

//更改签到设置配置信息
SignClass.prototype.changeInfo=function(param){
    this.EnableSign=param.EnableSign && param.EnableSign || "是";
    this.CheckSignType=param.CheckSignType && param.CheckSignType || "人脸识别";
    this.IndexSignType=param.IndexSignType && param.IndexSignType || "是";
    this.EnableOnlineSign=param.EnableOnlineSign && param.EnableOnlineSign || "是";
    this.EnableClassSelection=param.EnableClassSelection && param.EnableClassSelection || "是";
    this.Attendancetopush=param.Attendancetopush && param.Attendancetopush || "否";
}

//一键报警开启功能
var AlarmClass=function (param)
{
    //是否开启一键报警
    this.IsShowAlarm=param.IsShowAlarm && param.IsShowAlarm || "否";
    //一键报警主账号（账号）
    this.DeviceAlarmUserNo=param.DeviceAlarmUserNo && param.DeviceAlarmUserNo || "";
    //一键报警主账号（密码）
    this.DeviceAlarmUserPwd=param.DeviceAlarmUserPwd && param.DeviceAlarmUserPwd || "";
    //一键报警管理账号（账号）
    this.DeviceAlarmAdminNo=param.DeviceAlarmAdminNo && param.DeviceAlarmAdminNo || "";
    //一键报警管理账号（密码）
    this.DeviceAlarmAdminPwd=param.DeviceAlarmAdminPwd && param.DeviceAlarmAdminPwd || "其他";
}
//一键报警开启功能
SignClass.prototype.changeInfo=function(param){
    this.IsShowAlarm=param.IsShowAlarm && param.IsShowAlarm || "是";
    this.DeviceAlarmUserNo=param.DeviceAlarmUserNo && param.DeviceAlarmUserNo || "否";
    this.DeviceAlarmUserPwd=param.DeviceAlarmUserPwd && param.DeviceAlarmUserPwd || "是";
    this.DeviceAlarmAdminNo=param.DeviceAlarmAdminNo && param.DeviceAlarmAdminNo || "是";
    this.DeviceAlarmAdminPwd=param.DeviceAlarmAdminPwd && param.DeviceAlarmAdminPwd || "其他";
}


//系统信息
var systemInfo=function(){
    //设备序列号
    this.SerialNo="";
    //设备MAC地址
    this.MacAddress="";
}
systemInfo.prototype={
    //生成本地存储
    creatlocalStorage :function(obj)
    {
        for (var prop in obj)
        {
            if(typeof prop !== 'function')
            {
                console.log("jsonObj[" + prop + "]=" + obj[prop]);
                localStorage.setItem(prop,obj[prop]);
            }
        }
    },
    setScreenCss:function()
    {
        //设置屏幕的大小
        if (screen.width>=screen.height)
        {
            $("#divWelcome").attr("class", "SchoolBox");
        }
        else
        {
            $("#divWelcome").attr("class", "SchoolBox_H");
        }
    },
    deleteFile:function(){
        //删除对应的文件
        // androidClient.DeleteSignFile(7);
        // androidClient.DeleteLogFile(7);
    }
}

//创建二维码
function CreatEWM(runArray){
    var sdRoot = androidClient.getExternalStoragePath();
    var kdActivationCodePath = sdRoot + "/KadeActivation.bat";
	
    if(androidClient.isFileExits(kdActivationCodePath)=="true"){
        //授权文件已经存在
        runArray.shift();
    }
    else
    {
        //进行处理二维码扫描功能（生成二维码、显示二维码隐藏二维码）
		$('#EWMZDC,#EWM').show();
    }
}
//隐藏二维码回调（服务轮训回调函数）
function HideEWM()
{
	//激活成功隐藏二维码
	$('#EWMZDC,#EWM').hide();
	runArray.shift();
}

//模式选择
function ModelSel(){
    //已经进行了模式选择
	var strServerIp=localStorage.getItem("ServerPath");
	var strControlNo=localStorage.getItem("ControlNo");
    if(!!strServerIp && !!strControlNo&&LinkSystemClass.Model!=""){
		$('#EnterModel').hide();
		//已经进行模式选择
		eval(runArray.shift()+"();");
    }
    else
    {
        //没有进行模式选择
		$('#EnterModel').show();
    }
}


//模式保存
function saveOption(){
	var sControlNo=$('#txtControlNo').val();
	var sServerPath=$('#txtServerPath').val();
	linkSystemClass.changeServerPath(sServerPath);
	linkSystemClass.changeControlNo(sControlNo);	
	//后续为获取全部的数据进行change更改
	var data={};
	data.EnablePlaySound=$('#PlaySound').val()&& $('#PlaySound').val()|| "是";
	data.CheckFace=$('#CheckFace').val()&& $('#CheckFace').val()|| "是";
	data.Livingbody=$('#Livingbody').val()&& $('#Livingbody').val()|| "是";
	data.ScreenRotation=$('#txtScreenRotation').val()&& $('#txtScreenRotation').val()|| "是";
	data.CameraOrientation=$('#txtCameraOrientation').val()&& $('#txtCameraOrientation').val()|| "是";
	data.FaceScore=$('#selFaceScore').val()&& $('#selFaceScore').val()|| "75";
	data.FaceASF=$('#txtFaceASF').val() && $('#txtFaceASF').val() || "0";		
	data.SnapASF=$('#txtSnapASF').val() && $('#txtSnapASF').val() || "0";
	data.CameraImageX=$('#CameraImageX').val() && $('#CameraImageX').val() || "是";
	data.CameraImageY=$('#CameraImageY').val() && $('#CameraImageY').val() || "是";	
	data.FaceImageX=$('#FaceImageX').val() && $('#FaceImageX').val() || "是";
	data.FaceImageY=$('#FaceImageY').val() && $('#FaceImageY').val() || "是";
	data.TextImageX=$('#txtUploadRecvCamera').val() && $('#txtUploadRecvCamera').val() || "是";
	systemSetinfo.systemBaseInfoClass.changeInfo(data);
	systemSetinfo.readCardPortCls.changeInfo(data);
	// systemSetinfo.signClass.changeInfo(data);
	// systemSetinfo.alarmClass.changeInfo(data);
	systemSetinfo.faceClass.changeInfo(data);
	//生成对应的本地存储
	systemSetinfo.creatlocalStorage(systemSetinfo.systemBaseInfoClass);
	systemSetinfo.creatlocalStorage(systemSetinfo.readCardPortCls);
	// systemSetinfo.creatlocalStorage(systemSetinfo.signClass);
	// systemSetinfo.creatlocalStorage(systemSetinfo.alarmClass);
	systemSetinfo.creatlocalStorage(systemSetinfo.faceClass);
}

//进行基础设置
function ShowIndexSetting()
{
	$('#divOption').show();
}

// 进入页面
function RunPage()
{
	var strFunctionType= systemSetinfo.systemBaseInfoClass.FunctionType;
	var strFunctionStyle= systemSetinfo.systemBaseInfoClass.FunctionStyle;
    localStorage.setItem("AutoBackToHomePage","false");
    if (strFunctionType=="电子班牌")
    {
        var dzbp_path="dzbp";
        if (screen.width>=screen.height){
            dzbp_path='dzbp';
        }
        else{
            dzbp_path='dzbp_h';
        }
        var sFunctionStyleHref="";
        //CN 2019-04-12 修改初始化页面跳转
        if (strFunctionStyle.indexOf("默认样式")!==-1)
        {
            sFunctionStyleHref=strFunctionStyle.replace("默认样式", "index")+".html";
        }
        else if(strFunctionStyle.indexOf("样式")!==-1)
        {
            sFunctionStyleHref=strFunctionStyle.replace("样式", "index")+".html";
        }
        else
        {
            sFunctionStyleHref="index.html";
        }
		window.location.href= dzbp_path + "/"+sFunctionStyleHref;
	}
}