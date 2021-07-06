/*
 * @Author: [JokerChen]
 * @Date: 2021-06-22 19:03:59
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-06-22 19:04:26
 * @Description: 
 */
var ReadCardPort = androidClient.getValue("ReadCardPort");
var ReadCardPort_Second = androidClient.getValue("ReadCardPort_Second");
var QrcodePort = androidClient.getValue("QrcodePort");
var PosPort = androidClient.getValue("PosPort");
var intClearConsumeData = 0;
var strEmergencyKey="";
var intRepeatSendData = 0;
var strPageState = "welcome";
var timer=0;
var cnt=0;
var arrayEvent=[
  {'eventName':'ShowSysDateTime','eventTimer':5},
  {'eventName':'CheckConnectServer','eventTimer':10},
  {'eventName':'GetDictInfo','eventTimer':30}
];

$(function () {
    FastClick.attach(document.body);
    androidClient.SpeechPlay("欢迎使用人脸识别消费系统！");
    loadDefaultOption();
    initDictInfo();
    CheckConnectServer();
    ShowHomePageData();
    timerTask();

    document.getElementById('btnPassword').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        androidClient.showSystemManagerDialog(androidClient.getLanguage("系统菜单"),"00","systemmenu");
    }, false);

    document.getElementById('btnBack').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        switch (strPageState){
            case 'checkface':
            case 'persondetail':
                GotoPage("welcome");
                break;
        }
    }, false);

    document.getElementById('btnGoCheckFace').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        if (androidClient.getValue("CurrConsumeTime") == "true") {
            var strCalculator=$('#XF_Input_Calculator').text();
            if (strCalculator != "") {
                if (strCalculator.indexOf('=') == -1) {
                    var result = eval(strCalculator);
                    result = result.toFixed(2);
                    $('#XF_Input_ConsumeMoney').text(result);
                    $("#XF_Input_Calculator").text(strCalculator + "=" + result);
                    androidClient.setValue("CustomDeviceType", "计算器");
                }
                androidClient.SpeechPlay("请支付"+$('#XF_Input_ConsumeMoney').text()+"元");
                //进入人脸识别模块
                GotoPage("checkface");
            } else {
                if ($('#XF_Input_ConsumeMoney').text() != "") {
                    androidClient.SpeechPlay("请支付"+$('#XF_Input_ConsumeMoney').text()+"元");
                    //进入人脸识别模块
                    GotoPage("checkface");
                } else {
                    androidClient.SpeechPlay("请先输入消费金额后再确认");
                    androidClient.showText("请先输入消费金额后再确认");
                }
            }
        }
        else{
            androidClient.SpeechPlay("非用餐时段");
            androidClient.showText("非用餐时段");
        }
    }, false);

    document.getElementById('btnConfirmPay').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        if (androidClient.getValue("PayConfirm") == "是" && $('#XF_CheckResult').text() == "") {
            if ($('#XF_ConsumeMoney').text() != "") {
                ConsumeInsertRecord();
            } else {
                androidClient.SpeechPlay("请先输入消费金额后再支付");
                androidClient.showText("请先输入消费金额后再支付");
            }
        }
    }, false);

    document.getElementById('btnCancelPay').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        NotMePerson();
    }, false);
})
//时间调度函数
function timerTask() {
    clearTimeout(timer);
    timer= setTimeout(function() {
        var eventFiler=arrayEvent.filter(function(item){
            return cnt%item.eventTimer==0;
        })
        // eventFiler.eventName
        for (var value of eventFiler){
            if(window[value.eventName] == undefined)continue;
            window[value.eventName]();
        }
        eventFiler=null;
        //计数器10万次归零
        if(cnt>=100000){
            cnt=0;
            return false;
        }
        cnt++;
        timerTask();
    },1000);
}
// function ShowSysDateTime() {
//     $('#xfgl_systime').text(androidClient.getSysDateTime("HH:mm"));
//     $('#xfgl_sysdate').text(androidClient.getSysDateTime("yyyy-MM-dd"));
//     $('#xfgl_sysweek').text('星期' + '日一二三四五六'.charAt(new Date().getDay()));
// }
// function CheckConnectServer() {
//     if (androidClient.getValue("EmergencyMode")!="true"){
//         $(".index-content").removeClass("emergency-model");
//         if (androidClient.getValue("ConnectServer") == "true") {
//             $("#xfgl_state").addClass("online");
//             $("#xfgl_content").text("在线");
//         } else {
//             $("#xfgl_state").removeClass("online");
//             $("#xfgl_content").text("离线");
//         }
//     }
//     else{
//         $(".index-content").addClass("emergency-model");
//         $("#xfgl_state").removeClass("online");
//         $("#xfgl_content").text("应急");
//     }
// }
function GetDictInfo(){
    var dNowTime = androidClient.getSysDateTime("HH:mm");
    var strSql = "select * from DictInfo where (StartTime<EndTime and StartTime<='" + dNowTime + "' and EndTime>='" + dNowTime + "') or (StartTime>EndTime and (StartTime<='" + dNowTime + "' and '" + dNowTime + "'<='23:59' or EndTime>='" + dNowTime + "' and '" + dNowTime + "'>='00:00'))";
    var data_dict = androidClient.rawQuery(strSql);
    var result_dict = JSON.parse(data_dict);
    if (result_dict.length > 0) {
        $('#XF_DictName').text(result_dict[0].DictName);
        $('#XF_DeviceType').text(result_dict[0].deviceType);
        androidClient.setValue("CurrConsumeTime", "true");
        androidClient.setValue("CurrDictName", result_dict[0].DictName);
        androidClient.setValue("CurrPrice", result_dict[0].mealNo);
        if (androidClient.getValue("CurrDeviceType") != result_dict[0].deviceType) {
            androidClient.setValue("CurrDeviceType", result_dict[0].deviceType);
        }
        //显示份饭金额
        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1 && strPageState=="welcome" && $("#XF_Input_Calculator").text()=="") {
            $("#XF_Input_ConsumeMoney").text(androidClient.getValue("CurrPrice"));
        }
        else if (androidClient.getValue("CurrDeviceType")=="计算器"
            && strPageState=="welcome" && $("#XF_Input_Calculator").text()=="" && $("#XF_Input_ConsumeMoney").text()!="") {
            $("#XF_Input_ConsumeMoney").empty();
        }
    } else {
        $('#XF_DictName').empty();
        $('#XF_DeviceType').empty();
        androidClient.setValue("CurrConsumeTime", "false");
        androidClient.setValue("CurrDictName", "");
        androidClient.setValue("CurrPrice", "");
        if (androidClient.getValue("CurrDeviceType") != "") {
            androidClient.setValue("CurrDeviceType", "");
        }
    }
    //上传离线数据
    UploadOffLineConsumeData(false);
}
//显示首页数据
function ShowHomePageData() {
    //显示版本号
    $("#xfgl_version").text(androidClient.getVersionName());
    //显示机器号
    $('#XF_WindowsNo').text(androidClient.getValue("ControllerNo"));
    if (androidClient.getValue("StartUpDownloadData") == "是") {
        var dNowDate = androidClient.getSysDateTime("yyyy-MM-dd");
        if(androidClient.getValue("ConsumeToday") != dNowDate) {
            androidClient.setValue("ConsumeToday", dNowDate);
            DownLoadAllData_XF();
        }
    }
    //显示人员档案数量及人脸和照片数量
    $("#PersonNumber").text(androidClient.getValue("PersonDataNumber"));
    $("#ImageNumber").text(androidClient.getValue("PersonFaceNumber"));
    androidClient.getPersonFaceList();
    //调用一次WEBSERVICE接口
    androidClient.CYXF_HelloWorld();
}
//获取人脸和照片数量
function onGetPersonFaceList(data){
    androidClient.setValue("PersonFaceNumber",data);
    $("#ImageNumber").text(data);
    //显示人员数量
    ShowPersonNumber();
}
//获取人员数量
function ShowPersonNumber(){
    var data=androidClient.rawQuery("select count(distinct AccountNo) as PersonNumber from PersonInfo");
    var result = JSON.parse(data);
    if (result.length>0){
        $("#PersonNumber").text(result[0].PersonNumber);
        androidClient.setValue("PersonDataNumber",result[0].PersonNumber);
    }
    else{
        $("#PersonNumber").text("0");
        androidClient.setValue("PersonDataNumber","0");
    }
}
//校验人脸失败
function onReceiveFaceAlarm() {
    if ($('#XF_PersonName').text() != "") {
        $('#XF_PersonImage').attr('src', 'img/xf-mrHeade.png');
        $('#XF_AccountNo').empty();
        $('#XF_PersonName').empty();
        $('#XF_CheckResult').empty();
        //此处追加人脸关闭识别接口
        if (androidClient.getValue("DeviceCheck") == "刷卡加人脸") {
            androidClient.SpeechPlay("识别失败，请重新刷卡！");
            androidClient.setValue("CheckAccountNo", "");
        } else {
            androidClient.SpeechPlay("识别失败，请重新识别！");
        }
    }
}
//校验人脸成功
function onReceiveComparisonData(strJson) {
    androidClient.saveLog("onReceiveComparisonData:  "+strJson);
    var faceJson = JSON.parse(strJson);
    var strAccountNo = faceJson.accountno;
    $("#XF_Similar").text(parseInt(faceJson.similar * 100) + '%');
    if (androidClient.getValue("DeviceCheck") == "刷卡加人脸") {
        if (androidClient.getValue("CheckAccountNo") == strAccountNo) {
            androidClient.setFaceIdentify("false");
            androidClient.onlyface("");
            androidClient.setValue("CustomSpendMode","刷脸");
            DisposeConsumeInfo(strAccountNo, "");
        }
    } else if (androidClient.getValue("DeviceCheck") == "刷卡或人脸" || androidClient.getValue("DeviceCheck") == "只人脸") {
        androidClient.setFaceIdentify("false");
        androidClient.setValue("CustomSpendMode","刷脸");
        DisposeConsumeInfo(strAccountNo, "");
    }
}

//扫码回调
function onScanQRCode(data){
    androidClient.saveLog("onScanQRCode: "+data);
    if (strPageState!="checkface"){
        return false;
    }
    if (data.length==40){
        var idAndTime = qrDeCodeProject(data).split(",");
        var cardId = idAndTime[0];
        var time = idAndTime[1];
        var nowdTime = +new Date();
        //判断二维码是否失效 < 解码日期有效
        if ((nowdTime - time) > 0) {
            androidClient.SpeechPlay("当前二维码已过期");
            androidClient.showText("当前二维码已过期");
        } else {
            var dNowDateTime = androidClient.getSysDateTime("yyyy-MM-dd HH:mm:ss");
            if (cardId!=androidClient.getValue("LastReceiveSerialCardNo") || timec_second(androidClient.getValue("LastReceiveSerialDateTime"),dNowDateTime)>2){
                androidClient.setValue("LastReceiveSerialCardNo",cardId);
                androidClient.setValue("LastReceiveSerialDateTime",dNowDateTime);
            }
            else{
                return false;
            }
            androidClient.setValue("CustomSpendMode","刷码");
            DisposeConsumeInfo("", cardId);
        }
    }
    else{
        if (data.indexOf('http://login.weishao.com.cn')==0){
            var strServerPath = androidClient.getValue("ServerPath");
            var url = strServerPath + "ashx/ExtInterface/WeiShao/ApiV2.ashx";
            $.ajax(url, {
                data: {
                    action: "getIsTimeLimitedStrOk",
                    short_url: data
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'get', //HTTP请求类型
                timeout: 1000, //超时时间设置为10秒；
                success: function (result) {
                    androidClient.saveLog("getIsTimeLimitedStrOk: "+JSON.stringify(result));
                    var strStudentNumber=result.data.retData.my_info.student_number;
                    androidClient.saveLog("getIsTimeLimitedStrOk: "+strStudentNumber);
                    androidClient.setFaceIdentify("false");
                    androidClient.setValue("CustomSpendMode","刷码");
                    DisposeConsumeInfo(strStudentNumber, "");
                },
                error: function (xhr, type, errorThrown) {
                    androidClient.showText("调用接口失败:  " + type);
                }
            });
            return false;
        }
        if ($('#XF_CheckResult').text()=="正在支付，请稍等"){
            return false;
        }
        if (androidClient.getValue("CurrConsumeTime") == "false") {
            ShowFailText("非用餐时段");
            return false;
        }
        if (androidClient.getValue("CurrDeviceType") == "计算器/份饭") {
            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                androidClient.setValue("CustomDeviceType", "份饭");
                androidClient.setValue("CustomPrice", androidClient.getValue("CurrPrice"));
            } else {
                androidClient.setValue("CustomDeviceType", "计算器");
                androidClient.setValue("CustomPrice", $('#XF_Input_ConsumeMoney').text());
            }
        }
        else if (androidClient.getValue("CurrDeviceType") == "份饭") {
            androidClient.setValue("CustomDeviceType", "份饭");
            androidClient.setValue("CustomPrice", androidClient.getValue("CurrPrice"));
        }
        else if (androidClient.getValue("CurrDeviceType") == "计算器") {
            if ($('#XF_Input_ConsumeMoney').text()!=""){
                androidClient.setValue("CustomDeviceType", "计算器");
                androidClient.setValue("CustomPrice", $('#XF_Input_ConsumeMoney').text());
            }
            else{
                ShowFailText("请输入消费金额");
                return false;
            }
        }
        if(androidClient.IsOnNet()==true && androidClient.getValue("ConnectServer") == "true"){
            ShowNormalText("正在支付，请稍等");
            GotoPage("persondetail");
            androidClient.ABCQRPayReqRunnable(data,androidClient.getValue("CustomPrice"),androidClient.getValue("ControllerNo"));
        }
        else{
            ShowFailText("网络连接失败");
        }
    }
}
//NFC读卡回调
function getOnReceiveNFCCard(data) {
    if (strPageState!="checkface"){
        return false;
    }
    androidClient.saveLog("getOnReceiveNFCCard:  "+data);
    var cardId = ChangeCardId(data, "", "vg_34");
    if (androidClient.getValue("DeviceCheck")=="刷卡加人脸"){
        if(androidClient.getValue("CurrConsumeTime")=="true"){
            ShowBrushCardInfo(cardId);
        }
        else{
            androidClient.SpeechPlay("非用餐时段");
            androidClient.showText("非用餐时段");
        }
    }
    else if (androidClient.getValue("DeviceCheck")=="刷卡或人脸" || androidClient.getValue("DeviceCheck")=="只刷卡"){
        var dNowDateTime = androidClient.getSysDateTime("yyyy-MM-dd HH:mm:ss");
        if (cardId!=androidClient.getValue("LastReceiveSerialCardNo") || timec_second(androidClient.getValue("LastReceiveSerialDateTime"),dNowDateTime)>2){
            androidClient.setValue("LastReceiveSerialCardNo",cardId);
            androidClient.setValue("LastReceiveSerialDateTime",dNowDateTime);
        }
        else{
            return false;
        }
        androidClient.setValue("CustomSpendMode","刷卡");
        androidClient.setFaceIdentify("false");
        DisposeConsumeInfo("",cardId);
    }
}
//刷卡(原生触发)
function onReceiveSerialPortData(port, data) {
    if (strPageState!="checkface"){
        return false;
    }
    androidClient.saveLog("onReceiveSerialPortData:  "+port+ " "+data);
    if(port == ReadCardPort || port == ReadCardPort_Second){
        var cardId = getMachineCardId(data);
        if (androidClient.getValue("DeviceCheck")=="刷卡加人脸"){
            if(androidClient.getValue("CurrConsumeTime")=="true"){
                ShowBrushCardInfo(cardId);
            }
            else{
                androidClient.SpeechPlay("非用餐时段");
                androidClient.showText("非用餐时段");
            }
        }
        else if (androidClient.getValue("DeviceCheck")=="刷卡或人脸" || androidClient.getValue("DeviceCheck")=="只刷卡"){
            var dNowDateTime = androidClient.getSysDateTime("yyyy-MM-dd HH:mm:ss");
            if (cardId!=androidClient.getValue("LastReceiveSerialCardNo") || timec_second(androidClient.getValue("LastReceiveSerialDateTime"),dNowDateTime)>2){
                androidClient.setValue("LastReceiveSerialCardNo",cardId);
                androidClient.setValue("LastReceiveSerialDateTime",dNowDateTime);
            }
            else{
                return false;
            }
            androidClient.setValue("CustomSpendMode","刷卡");
            androidClient.setFaceIdentify("false");
            DisposeConsumeInfo("",cardId);
        }
    }
    else if (port==QrcodePort){
        data=BcdToData(data);
        androidClient.saveLog("onReceiveSerialPortData_QrcodePort:  "+data);
        if (data.length==40){
            var idAndTime = qrDeCodeProject(data).split(",");
            var cardId = idAndTime[0];
            var time = idAndTime[1];
            var nowdTime = +new Date();
            androidClient.showLog("QrCode: " + cardId + " " + time);
            //判断二维码是否失效 < 解码日期有效
            if ((nowdTime - time) > 0) {
                androidClient.SpeechPlay('当前二维码已过期');
                androidClient.showText('当前二维码已过期');
            }
            else{
                var dNowDateTime = androidClient.getSysDateTime("yyyy-MM-dd HH:mm:ss");
                if (cardId!=androidClient.getValue("LastReceiveSerialCardNo") || timec_second(androidClient.getValue("LastReceiveSerialDateTime"),dNowDateTime)>2){
                    androidClient.setValue("LastReceiveSerialCardNo",cardId);
                    androidClient.setValue("LastReceiveSerialDateTime",dNowDateTime);
                }
                else{
                    return false;
                }
                androidClient.setValue("CustomSpendMode","刷码");
                DisposeConsumeInfo("",cardId);
            }
        }
        else{
            if (data.indexOf('http://login.weishao.com.cn')==0){
                var strServerPath = androidClient.getValue("ServerPath");
                var url = strServerPath + "ashx/ExtInterface/WeiShao/ApiV2.ashx";
                $.ajax(url, {
                    data: {
                        action: "getIsTimeLimitedStrOk",
                        short_url: data
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'get', //HTTP请求类型
                    timeout: 1000, //超时时间设置为10秒；
                    success: function (result) {
                        androidClient.saveLog("getIsTimeLimitedStrOk: "+JSON.stringify(result));
                        var strStudentNumber=result.data.retData.my_info.student_number;
                        androidClient.saveLog("getIsTimeLimitedStrOk: "+strStudentNumber);
                        androidClient.setValue("CustomSpendMode","刷码");
                        androidClient.setFaceIdentify("false");
                        DisposeConsumeInfo(strStudentNumber, "");
                    },
                    error: function (xhr, type, errorThrown) {
                        androidClient.showText("调用接口失败:  " + type);
                    }
                });
                return false;
            }
            if ($('#XF_CheckResult').text()=="正在支付，请稍等"){
                return false;
            }
            if (androidClient.getValue("CurrConsumeTime") == "false") {
                ShowFailText("非用餐时段");
                return false;
            }
            if (androidClient.getValue("CurrDeviceType") == "计算器/份饭") {
                if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                    androidClient.setValue("CustomDeviceType", "份饭");
                    androidClient.setValue("CustomPrice", androidClient.getValue("CurrPrice"));
                } else {
                    androidClient.setValue("CustomDeviceType", "计算器");
                    androidClient.setValue("CustomPrice", $('#XF_Input_ConsumeMoney').text());
                }
            }
            else if (androidClient.getValue("CurrDeviceType") == "份饭") {
                androidClient.setValue("CustomDeviceType", "份饭");
                androidClient.setValue("CustomPrice", androidClient.getValue("CurrPrice"));
            }
            else if (androidClient.getValue("CurrDeviceType") == "计算器") {
                if ($('#XF_Input_ConsumeMoney').text()!=""){
                    androidClient.setValue("CustomDeviceType", "计算器");
                    androidClient.setValue("CustomPrice", $('#XF_Input_ConsumeMoney').text());
                }
                else{
                    ShowFailText("请输入消费金额");
                    return false;
                }
            }
            if(androidClient.IsOnNet()==true && androidClient.getValue("ConnectServer") == "true"){
                ShowNormalText("正在支付，请稍等");
                GotoPage("persondetail");
                androidClient.ABCQRPayReqRunnable(data,androidClient.getValue("CustomPrice"),androidClient.getValue("ControllerNo"));
            }
            else{
                ShowFailText("网络连接失败");
            }
        }
    }
    else if (port == PosPort){
        if (androidClient.getValue("DeviceMode")=="与消费机共同运行"){
            var sOrder=data.substr(0,6);
            if (sOrder=="888002"){      //支付成功
                clearTimeout(intClearConsumeData);
                var sWindowsNo=data.substr(8,4);
                var sConsumeMoney=parseInt(data.substr(12,6)) + "." + data.substr(18,2);
                var sPersonMoney=parseInt(data.substr(20,6)) + "." + data.substr(26,2);
                $('#XF_WindowsNo').text(sWindowsNo);
                $('#XF_ConsumeMoney').text(sConsumeMoney);
                $('#XF_PersonMoney').text(sPersonMoney);
                $('#XF_CheckResult').text("支付成功");
                $("#XF_CheckResult").removeClass("red");
                $("#XF_CheckResult").addClass("green");
                androidClient.SpeechPlay("支付成功");
                intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 1500);
            }
            else if (sOrder=="88E002"){     //支付失败
                clearTimeout(intClearConsumeData);
                $('#XF_CheckResult').text("");
                $("#XF_CheckResult").removeClass("green");
                $("#XF_CheckResult").addClass("red");
                var sDataLength=parseInt(HexToDec(data.substr(6,2)))*2;
                var sFailResult=data.substr(8,sDataLength);
                var sChineseResult="";
                for (var i=0;i<sFailResult.length/4;i++){
                    sChineseResult+=UnicodeToChar("\\u" + sFailResult.substr(i*4+2,2) + sFailResult.substr(i*4,2));
                }
                $('#XF_CheckResult').text(sChineseResult);
                androidClient.SpeechPlay("支付失败");
                intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 1500);
            }
            else if (sOrder=="88A002"){     //计算器模式发送消费金额
                androidClient.setFaceIdentify("true");
    //            $('#XF_WindowsNo').empty();
    //            $('#XF_DictName').empty();
    //            $('#XF_DeviceType').empty();
                $('#XF_AccountNo').empty();
                $('#XF_PersonName').empty();
                $('#XF_PersonMoney').empty();
                $('#XF_CheckResult').empty();
                $('#XF_PersonImage').attr('src', "img/xf-mrHeade.png");
                $('#XF_ConsumeMoney').text(parseInt(data.substr(8,6)) + "." + data.substr(14,2));
                $('#XF_CheckResult').removeClass("red").removeClass("green");
                $('#XF_CheckResult').removeClass("red").removeClass("red");
                androidClient.SpeechPlay("消费"+ parseInt(data.substr(8,6)) + "." + data.substr(14,2) +"元，请识别");
            }
            else if (sOrder=="88C002"){     //计算器模式关闭交易
                clearTimeout(intClearConsumeData);
                ClearConsumeData();
            }
        }
        else if (androidClient.getValue("DeviceMode")=="与宝石共同运行"){
            var sOrder=data.substr(0,8);
            if (sOrder=="AA1B0020"){
                var strPersonMoney = HexToDec(data.substr(32,2) + data.substr(30,2) + data.substr(28,2) + data.substr(26,2));
                strPersonMoney=parseFloat(parseInt(strPersonMoney)/100).toFixed(2);
                var strConsumeMoney = HexToDec(data.substr(24,2) + data.substr(22,2) + data.substr(20,2));
                strConsumeMoney=parseFloat(parseInt(strConsumeMoney)/100).toFixed(2);
                var strConsumeResult=data.substr(34,2);
                var strConsumeResultChinese=androidClient.stringToGbk(data.substr(36,24));
                if (strConsumeResult=="01"){
                    $('#XF_ConsumeMoney').text(strConsumeMoney);
                    $('#XF_PersonMoney').text(strPersonMoney);
                    androidClient.SpeechPlay("消费"+ strConsumeMoney +"元，请支付");
                }
                else{
                    if (strConsumeResultChinese=="" || strConsumeResultChinese==undefined){
                        strConsumeResultChinese="获取消费失败";
                    }
                    $('#XF_CheckResult').text(strConsumeResultChinese);
                    $('#XF_CheckResult').removeClass("green");
                    $('#XF_CheckResult').addClass("red");
                    androidClient.SpeechPlay(strConsumeResultChinese);
                    intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 1500);
                }
            }
            else if (sOrder=="CC1B0020"){
                var strConsumeMoney=HexToDec(data.substr(16,2) + data.substr(14,2) + data.substr(12,2));
                strConsumeMoney=parseFloat(parseInt(strConsumeMoney)/100).toFixed(2);
                androidClient.setFaceIdentify("true");
                $('#XF_AccountNo').empty();
                $('#XF_PersonName').empty();
                $('#XF_PersonMoney').empty();
                $('#XF_CheckResult').empty();
                $('#XF_PersonImage').attr('src', "img/xf-mrHeade.png");
                $('#XF_ConsumeMoney').text(strConsumeMoney);
                $('#XF_CheckResult').removeClass("red").removeClass("green");
                $('#XF_CheckResult').removeClass("red").removeClass("red");
                androidClient.SpeechPlay("消费"+ strConsumeMoney +"元，请识别");
            }
            else if (sOrder=="DD1B0020"){
                var strPersonMoney = HexToDec(data.substr(32,2) + data.substr(30,2) + data.substr(28,2) + data.substr(26,2));
                strPersonMoney=parseFloat(parseInt(strPersonMoney)/100).toFixed(2);
                var strConsumeMoney = HexToDec(data.substr(24,2) + data.substr(22,2) + data.substr(20,2));
                strConsumeMoney=parseFloat(parseInt(strConsumeMoney)/100).toFixed(2);
                clearTimeout(intClearConsumeData);
                $('#XF_PersonMoney').text(strPersonMoney);
                $('#XF_ConsumeMoney').text(strConsumeMoney);
                var strConsumeResult=data.substr(34,2);
                var strConsumeResultChinese=androidClient.stringToGbk(data.substr(36,24));
                if (strConsumeResult=="01"){
                    $('#XF_CheckResult').text("支付成功");
                    $('#XF_CheckResult').removeClass("red");
                    $('#XF_CheckResult').addClass("green");
                    androidClient.SpeechPlay("支付成功");
                    OpenDoor_MenJin();
                }
                else{
                    if (strConsumeResultChinese=="" || strConsumeResultChinese==undefined){
                        strConsumeResultChinese="支付失败";
                    }
                    $('#XF_CheckResult').text(strConsumeResultChinese);
                    $('#XF_CheckResult').removeClass("green");
                    $('#XF_CheckResult').addClass("red");
                    androidClient.SpeechPlay(strConsumeResultChinese);
                }
                intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 1500);
            }
            else if (sOrder=="EE1B0020"){
                PosCardLastSendTimes+=1;
                if (PosCardLastSendTimes>3){
                    PosCardLastSendTimes=0;
                    $('#XF_CheckResult').text("取消交易");
                    $('#XF_CheckResult').removeClass("green");
                    $('#XF_CheckResult').addClass("red");
                    androidClient.SpeechPlay("取消交易");
                    clearTimeout(intClearConsumeData);
                    intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 1000);
                }
                else{
                    clearTimeout(intRepeatSendData);
                    intRepeatSendData=setTimeout(function(){
                        androidClient.saveLog("第" + PosCardLastSendTimes.toString() + "次重发数据：" + PosCardLastSendData)
                        androidClient.sendSerialMsg(PosPort,PosCardLastSendData);
                        clearTimeout(intClearConsumeData);
                        intClearConsumeData=setTimeout(function(){ClearConsumeData();}, 2000);
                    }, 500);
                }
            }
        }
    }
}
//清除消费数据
function ClearConsumeData() {
    $("#XF_Input_Calculator").empty();
    $("#XF_Input_ConsumeMoney").empty();
    $('#XF_AccountNo').empty();
    $('#XF_PersonName').empty();
    $('#XF_ConsumeMoney').empty();
    $('#XF_PersonMoney').empty();
    $('#XF_CheckResult').empty();
    $("#XF_Similar").empty();
    $("#XF_PersonImage").attr('src', "img/xf-mrHeade.png");
    $("#XF_CheckResult").removeClass("red").removeClass("green");
    GotoPage("welcome");
    $('#btnConfirmPay').show();
    $('#btnCancelPay').show();
}
//根据卡号获取人员信息(用于刷卡加人脸模式下)
function ShowBrushCardInfo(cardId) {
    var strSql = "select * from PersonInfo where CardNo='" + cardId + "'";
    var data = androidClient.rawQuery(strSql);
    var result = JSON.parse(data);
    if (result.length > 0) {
        androidClient.setValue("CheckAccountNo", result[0].AccountNo);
        androidClient.onlyface(result[0].AccountNo);
        androidClient.setFaceIdentify("true");
    } else {
        if (androidClient.getValue("DownloadPersonByCard") == "是") {
            if (androidClient.IsOnNet() == true && androidClient.getValue("ConnectServer") == "true") {
                var strTypeId = "";
                if (androidClient.getValue("ConsumePersonType") == "教师") {
                    strTypeId = "1";
                } else if (androidClient.getValue("ConsumePersonType") == "学生") {
                    strTypeId = "0";
                }
                var strServerPath = androidClient.getValue("ServerPath");
                var url = strServerPath + "ashx/dzbp/DownloadService.ashx";
                $.ajax(url, {
                    data: {
                        action: "ConsumePersonInfoByCardNo",
                        ControllerNo: androidClient.getValue("ControllerNo"),
                        TypeId: strTypeId,
                        CardNo: cardId
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 1000, //超时时间设置为10秒；
                    success: function (data) {
                        var result = data.rows;
                        if (result.length > 0) {
                            androidClient.setValue("CheckAccountNo", result[0].accountno);
                            androidClient.onlyface(result[0].accountno);
                            androidClient.setFaceIdentify("true");
                            //重新下载此人档案
                            androidClient.downloadConsumePersonDataByCardNo(cardId);
                        } else {
                            androidClient.SpeechPlay("非本系统人员");
                            androidClient.showText("非本系统人员");
                            return false;
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        androidClient.SpeechPlay("网络连接异常");
                        androidClient.showText("网络连接异常");
                        return false;
                    }
                });
            } else {
                androidClient.SpeechPlay("网络连接失败");
                androidClient.showText("网络连接失败");
                return false;
            }
        } else {
            androidClient.SpeechPlay("非本系统人员");
            androidClient.showText("非本系统人员");
            return false;
        }
    }
}
//处理消费信息
function DisposeConsumeInfo(sAccountNo, sCardNo) {
    var strSql="";
    if (sAccountNo!="" && sCardNo==""){
        strSql = "select * from PersonInfo where AccountNo='" + sAccountNo + "' order by CardType";
    }
    else if (sAccountNo=="" && sCardNo!=""){
        strSql = "select * from PersonInfo where CardNo='" + sCardNo + "' order by CardType";
    }
    var data = androidClient.rawQuery(strSql);
    var result = JSON.parse(data);
    if (result.length > 0) {
        clearTimeout(intClearConsumeData);
        if (androidClient.getValue("PlayPersonName") != "否") {
            androidClient.SpeechPlay(result[0].PersonName);
        }
        androidClient.setValue("CustomAccountNo", result[0].AccountNo);
        androidClient.setValue("CustomPersonName", result[0].PersonName);
        androidClient.setValue("CustomPersonFlagNo",result[0].PersonFlagNo);
        androidClient.setValue("CustomCardNo", result[0].CardNo);
        if (androidClient.getValue("CurrDeviceType") == "计算器/份饭") {
            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                androidClient.setValue("CustomDeviceType", "份饭");
            } else {
                androidClient.setValue("CustomDeviceType", "计算器");
            }
        }
        else {
            androidClient.setValue("CustomDeviceType", androidClient.getValue("CurrDeviceType"));
        }
        $('#XF_AccountNo').text(result[0].AccountNo);
        $('#XF_PersonName').text(result[0].PersonName);
        $("#XF_ConsumeMoney").text($("#XF_Input_ConsumeMoney").text());
        if (androidClient.isFileExits(result[0].LocalUserImg) == "true") {
            $('#XF_PersonImage').attr('src', GetClearCacheImg(result[0].LocalUserImg));
        } else {
            $('#XF_PersonImage').attr('src', GetClearCacheImg(result[0].UserImg));
        }
        $('#XF_PersonImage').attr('onerror', "this.src=\'img/xf-mrHeade.png\'");
        if (androidClient.getValue("PayConfirm") == "是") {
            $("#XF_CheckResult").removeClass("red");
            $("#XF_CheckResult").removeClass("green");
            GetPersonMoney(result[0].AccountNo, result[0].CardNo);
        } else {
            ConsumeInsertRecord();
        }
        GotoPage("persondetail");
    } else {
        if (sAccountNo == "" && sCardNo != "" && androidClient.getValue("ConsumeInterfaceType")!="单机版") {
            if (androidClient.getValue("DownloadPersonByCard") == "是") {
                if (androidClient.IsOnNet() == true && androidClient.getValue("ConnectServer") == "true") {
                    var strTypeId = "";
                    if (androidClient.getValue("ConsumePersonType") == "教师") {
                        strTypeId = "1";
                    } else if (androidClient.getValue("ConsumePersonType") == "学生") {
                        strTypeId = "0";
                    }
                    var strServerPath = androidClient.getValue("ServerPath");
                    var url = strServerPath + "ashx/dzbp/DownloadService.ashx";
                    $.ajax(url, {
                        data: {
                            action: "ConsumePersonInfoByCardNo",
                            ControllerNo: androidClient.getValue("ControllerNo"),
                            TypeId: strTypeId,
                            CardNo: sCardNo
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 3000, //超时时间设置为10秒；
                        success: function (data) {
                            var result = data.rows;
                            if (result.length > 0) {
                                    clearTimeout(intClearConsumeData);
                                if (androidClient.getValue("PlayPersonName") != "否") {
                                    androidClient.SpeechPlay(result[0].personname);
                                }
                                androidClient.setValue("CustomAccountNo", result[0].accountno);
                                androidClient.setValue("CustomPersonName", result[0].personname);
                                androidClient.setValue("CustomPersonFlagNo", result[0].flagno);
                                androidClient.setValue("CustomCardNo", result[0].personcardno);
                                androidClient.setValue("CustomSpendMode","刷卡");
                                if (androidClient.getValue("CurrDeviceType") == "计算器/份饭") {
                                    if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                                        androidClient.setValue("CustomDeviceType", "份饭");
                                    } else {
                                        androidClient.setValue("CustomDeviceType", "计算器");
                                    }
                                }
                                else{
                                    androidClient.setValue("CustomDeviceType",androidClient.getValue("CurrDeviceType"));
                                }
                                $('#XF_AccountNo').text(result[0].accountno);
                                $('#XF_PersonName').text(result[0].personname);
                                $('#XF_PersonImage').attr('src', GetClearCacheImg(strServerPath + result[0].personimage));
                                $('#XF_PersonImage').attr('onerror', "this.src=\'img/xf-mrHeade.png\'");
                                if (androidClient.getValue("PayConfirm") == "是") {
                                    $("#XF_CheckResult").removeClass("red");
                                    $("#XF_CheckResult").removeClass("green");
                                    GetPersonMoney(result[0].accountno, result[0].personcardno);
                                } else {
                                    ConsumeInsertRecord();
                                }
                                GotoPage("persondetail");
                                //重新下载此人档案
                                androidClient.downloadConsumePersonDataByCardNo(sCardNo);
                            } else {
                                androidClient.SpeechPlay("非本系统人员");
                                androidClient.showText("非本系统人员");
                                GotoPage("welcome");
                            }
                            return false;
                        },
                        error: function (xhr, type, errorThrown) {
                            androidClient.SpeechPlay("网络连接异常");
                            androidClient.showText("网络连接异常");
                            GotoPage("welcome");
                            return false;
                        }
                    });
                } else {
                    androidClient.SpeechPlay("网络连接失败");
                    androidClient.showText("网络连接失败");
                    GotoPage("welcome");
                    return false;
                }
            } else {
                androidClient.SpeechPlay("非本系统人员");
                androidClient.showText("非本系统人员");
                GotoPage("welcome");
                return false;
            }
        } else {
            androidClient.SpeechPlay("非本系统人员");
            androidClient.showText("非本系统人员");
            GotoPage("welcome");
            return false;
        }
    }
}
//插入消费数据
function ConsumeInsertRecord() {
    $('#XF_CheckResult').text("等待支付结果");
    $('#btnConfirmPay').hide();
    $('#btnCancelPay').hide();
    clearTimeout(intClearConsumeData);
    intClearConsumeData = setTimeout(function () {
        androidClient.SpeechPlay("支付超时");
        $('#XF_CheckResult').text("支付超时");
        $("#XF_CheckResult").removeClass("green");
        $("#XF_CheckResult").addClass("red");
        clearTimeout(intClearConsumeData);
        intClearConsumeData = setTimeout(function () {
            ClearConsumeData();
        }, 1500);
    }, 10000);
    if (androidClient.getValue("DeviceMode") == "与消费机共同运行") {
        //向消费机发送支付成功命令
        var SendCardNo = androidClient.getValue("CustomCardNo");
        SendCardNo = padLeft(DecToHex(SendCardNo), "0", 8).toUpperCase();
        SendCardNo = SendCardNo.substr(6, 2) + SendCardNo.substr(4, 2) + SendCardNo.substr(2, 2) + SendCardNo.substr(0, 2);
        var SendData = "00010500" + SendCardNo;
        SendData = "88" + SendData + padLeft('', '0', 126) + CRCMaster.Calculate(SendData, "HEX", "crcccitt-kermit") + "AA";
        androidClient.showLog("sendSerialPort:" + PosPort + "  sendSerialData:" + SendData);
        androidClient.sendSerialMsg(PosPort, SendData);
        androidClient.sendSerialMsg(ReadCardPort, "AA0804" + SendCardNo + "55"); //兼容通过WG信号连接的消费机
    }
    else if (androidClient.getValue("DeviceMode") == "与宝石共同运行") {
        //向消费机发送支付成功命令
        var SendCardNo = androidClient.getValue("CustomCardNo");
        SendCardNo = padLeft(DecToHex(SendCardNo), "0", 8).toUpperCase();
        SendCardNo = SendCardNo.substr(6, 2) + SendCardNo.substr(4, 2) + SendCardNo.substr(2, 2) + SendCardNo.substr(0, 2);
        var SendData = "CC1B0020000001" + SendCardNo + "01000000000000000000000000000000000000";
        SendData = SendData + AddCheckOut(SendData, false);
        androidClient.showLog("sendSerialPort:" + PosPort + "  sendSerialData:" + SendData);
        androidClient.sendSerialMsg(PosPort, SendData);
    }
    else {
        if (androidClient.getValue("CurrConsumeTime") == "true") {
            if ($('#XF_ConsumeMoney').text() != "") {
                androidClient.setValue("CustomPrice", $('#XF_ConsumeMoney').text());
            } else {
                androidClient.setValue("CustomPrice", androidClient.getValue("CurrPrice"));
            }
            if (androidClient.getValue("PayMoneyLimit")!="0"){
                if (parseFloat(androidClient.getValue("CustomPrice"))>parseFloat(androidClient.getValue("PayMoneyLimit"))){
                    ShowFailText("支付金额超过单次限额");
                    return false;
                }
            }
            var dNowDateTime = androidClient.getSysDateTime("yyyy-MM-dd HH:mm:ss");
            androidClient.setValue("CustomSpendDate", dNowDateTime.split(' ')[0]);
            androidClient.setValue("CustomSpendTime", dNowDateTime.split(' ')[1]);
            androidClient.setValue("CustomSpendKey", androidClient.getUUID());
            if (androidClient.IsOnNet() == true && androidClient.getValue("ConnectServer") == "true" && androidClient.getValue("EmergencyMode")!="true") {
                if (androidClient.getValue("ConsumeInterfaceType")=="单机版"){
                    androidClient.StandAlone_UploadConsumeData(androidClient.getValue("CustomAccountNo"),androidClient.getValue("CustomPersonName"),androidClient.getValue("CustomCardNo"),dNowDateTime , androidClient.getValue("CustomPrice"), androidClient.getValue("CustomSpendMode"), androidClient.getValue("CustomDeviceType"),"1",androidClient.getValue("CustomSpendKey"));
                }
                else{
                    if (androidClient.getValue("OtherPayDeviceSpend")!="是"){
                        androidClient.CYXF_P3DeviceSpend(androidClient.getValue("CustomAccountNo"),androidClient.getValue("CustomPersonName"),androidClient.getValue("CustomCardNo"), androidClient.getValue("CustomPrice"), androidClient.getValue("CustomDeviceType"),androidClient.getValue("CustomSpendMode"),androidClient.getValue("CustomSpendKey"));
                    }
                    else{
                        androidClient.CYXF_P3ThirdOrderPay(androidClient.getValue("CustomAccountNo"),androidClient.getValue("CustomPersonName"),androidClient.getValue("CustomCardNo"),androidClient.getValue("CustomSpendDate"),androidClient.getValue("CustomSpendTime"), androidClient.getValue("CustomPrice"), androidClient.getValue("CustomDeviceType"),androidClient.getValue("CustomSpendMode"),androidClient.getValue("CustomSpendKey"),"0");
                    }
                }
            } else {
                ConsumeInsertRecord_OffLine();
            }
        } else {
            clearTimeout(intClearConsumeData);
            ClearConsumeData();
            androidClient.SpeechPlay("非用餐时段");
            androidClient.showText("非用餐时段");
        }
    }
}
//插入脱机消费数据
function ConsumeInsertRecord_OffLine() {
    clearTimeout(intClearConsumeData);
    var strPersonFlagResult = CheckPersonFlag();
    if (strPersonFlagResult == "ok") {
        var strSql = "Insert into PersonDetail(AccountNo,PersonName,PersonShortName,SpendDate,SpendTime,SpendMoney,CardNo,MachineNo,WindowsNo,Flag,PayType,WorkMode,DishNo,DishName,DeviceType,SpendKey)values(";
        strSql += "'" + androidClient.getValue("CustomAccountNo") + "','" + androidClient.getValue("CustomPersonName") + "','" + androidClient.getFirstSpell(androidClient.getValue("CustomPersonName")) + "',";
        strSql += "'" + androidClient.getValue("CustomSpendDate") + "','" + androidClient.getValue("CustomSpendTime") + "','" + androidClient.getValue("CustomPrice") + "',";
        strSql += "'" + androidClient.getValue("CustomCardNo") + "','" + androidClient.getValue("MachineNo") + "','" + androidClient.getValue("ControllerNo") + "',";
        strSql += "'0','" + androidClient.getValue("CustomSpendMode") + "','" + androidClient.getValue("CurrDictName") + "','','','" + androidClient.getValue("CustomDeviceType") + "','" + androidClient.getValue("CustomSpendKey") + "')";
        androidClient.execSQL(strSql);

        if (androidClient.getValue("PlayConsumeMoney")=="是") {
            ShowSuccessText("支付成功，消费" + androidClient.getValue("CustomPrice") + "元");
        } else {
            ShowSuccessText("支付成功");
        }
        $('#XF_ConsumeMoney').text(androidClient.getValue("CustomPrice"));
        $('#XF_PersonMoney').text("");
        OpenDoor_MenJin();
        SendToWindows("ok:0:0");
    } else {
        $("#XF_CheckResult").text(strPersonFlagResult);
        $("#XF_CheckResult").removeClass("green");
        $("#XF_CheckResult").addClass("red");
        androidClient.SpeechPlay(strPersonFlagResult);
        intClearConsumeData = setTimeout(function () {
            ClearConsumeData();
        }, 1500);
    }
}
//根据人员身份验证消费
function CheckPersonFlag() {
    var strSql = "select * from PersonFlag where FlagNo='" + androidClient.getValue("CustomPersonFlagNo") + "'";
    var data_Flag = androidClient.rawQuery(strSql);
    var result_Flag = JSON.parse(data_Flag);
    if (result_Flag.length > 0) {
        var dNowDate = androidClient.getSysDateTime("yyyy-MM-dd");
        var ZaoCount = 0;
        var ZaoSum = 0;
        var WuCount = 0;
        var WuSum = 0;
        var WanCount = 0;
        var WanSum = 0;
        var YeCount = 0;
        var YeSum = 0;
        var DayCount = 0;
        var DaySum = 0;
        var data_Detail = androidClient.rawQuery("select WorkMode,count(*) as DetailCount,sum(SpendMoney) as DetailSum from PersonDetail where AccountNo='" + androidClient.getValue("CustomAccountNo") + "' and SpendDate='" + dNowDate + "' group by WorkMode");
        var result_Detail = JSON.parse(data_Detail);
        for (var i = 0; i < result_Detail.length; i++) {
            if (result_Detail[i].WorkMode == "早") {
                ZaoCount = result_Detail[i].DetailCount;
                ZaoSum = result_Detail[i].DetailSum;
            } else if (result_Detail[i].WorkMode == "午") {
                WuCount = result_Detail[i].DetailCount;
                WuSum = result_Detail[i].DetailSum;
            } else if (result_Detail[i].WorkMode == "晚") {
                WanCount = result_Detail[i].DetailCount;
                WanSum = result_Detail[i].DetailSum;
            } else if (result_Detail[i].WorkMode == "夜") {
                YeCount = result_Detail[i].DetailCount;
                YeSum = result_Detail[i].DetailSum;
            }
        }
        DayCount = ZaoCount + WuCount + WanCount + YeCount;
        DaySum = ZaoSum + WuSum + WanSum + YeSum;
        for (var i = 0; i < result_Flag.length; i++) {
            if (result_Flag[i].DayCs != "" && result_Flag[i].DayCs != "0") {
                if (DayCount >= parseInt(result_Flag[i].DayCs)) {
                    return "已超当日限次";
                }
            }
            if (result_Flag[i].EveryDayLimit != "") {
                if (parseFloat(result_Flag[i].EveryDayLimit) > 0) {
                    if (DaySum >= parseFloat(result_Flag[i].EveryDayLimit)) {
                        return "已超当日限额";
                    }
                }
            }
            if (androidClient.getValue("CurrDictName") == "早") {
                if (result_Flag[i].ZaoDictCs != "" && result_Flag[i].ZaoDictCs != "0") {
                    if (ZaoCount >= parseInt(result_Flag[i].ZaoDictCs)) {
                        return "早餐已超当餐限次";
                    }
                }
            } else if (androidClient.getValue("CurrDictName") == "午") {
                if (result_Flag[i].WuDictCs != "" && result_Flag[i].WuDictCs != "0") {
                    if (WuCount >= parseInt(result_Flag[i].WuDictCs)) {
                        return "午餐已超当餐限次";
                    }
                }
            } else if (androidClient.getValue("CurrDictName") == "晚") {
                if (result_Flag[i].WanDictCs != "" && result_Flag[i].WanDictCs != "0") {
                    if (WanCount >= parseInt(result_Flag[i].WanDictCs)) {
                        return "晚餐已超当餐限次";
                    }
                }
            } else if (androidClient.getValue("CurrDictName") == "夜") {
                if (result_Flag[i].YeDictCs != "" && result_Flag[i].YeDictCs != "0") {
                    if (YeCount >= parseInt(result_Flag[i].YeDictCs)) {
                        return "夜餐已超当餐限次";
                    }
                }
            }
        }
    }
    return "ok";
}

//向消费机发送支付成功命令（用于消费机显示）
function SendToWindows(strData) {
    var SendData = CharToUnicode(strData);
    SendData = "0001" + padLeft(DecToHex(SendData.length / 2), '0', 2) + SendData;
    SendData = "88" + SendData + CRCMaster.Calculate(SendData, "HEX", "crcccitt-kermit") + "AA";
    androidClient.showLog("sendSerialPort:" + PosPort + "  sendSerialData:" + SendData);
    androidClient.sendSerialMsg(PosPort, SendData);
}

//打开门禁控制器
function OpenDoor_MenJin() {
    var strSendData = "AA02000055";
    androidClient.sendSerialMsg(ReadCardPort, strSendData);
    androidClient.openRelayPower(parseInt(androidClient.getValue("OpenDoorTime")));
}
//设置人脸镜像及showface
function SetFaceOrientationFormat() {
    if (androidClient.getScreenWidth()==1280 && androidClient.getScreenHeight()==800){
         androidClient.showCirCleFace(420, 218, 440, 440);
    }
    if (androidClient.getScreenWidth()==1208 && androidClient.getScreenHeight()==800){
         androidClient.showCirCleFace(420, 218, 440, 440);
    }
    else if (androidClient.getScreenWidth()==1280 && androidClient.getScreenHeight()==720){
        androidClient.showCirCleFace(420, 178, 440, 440);
    }
    else if (androidClient.getScreenWidth()==1920 && androidClient.getScreenHeight()==1080){
        androidClient.showCirCleFace(630, 270, 660, 660);
    }
    else if (androidClient.getScreenWidth() == 1024) {
        androidClient.showCirCleFace(338, 158, 348, 348);
    }
    else if (androidClient.getScreenWidth() == 806 && androidClient.getScreenHeight()==480) {
        androidClient.showCirCleFace(282, 121, 290, 290);
    }
    else {
        androidClient.showText("人脸识别分辨率未适配");
    }
    if (androidClient.getValue("DeviceCheck") == "刷卡加人脸" || androidClient.getValue("DeviceCheck") == "只刷卡") {
        androidClient.setFaceIdentify("false");
    }
    else{
        androidClient.setFaceIdentify("true");
    }
}

function NotMePerson() {
    if (androidClient.getValue("PayConfirm") == "是"
            && $('#XF_PersonName').text() != ""
            && $('#XF_CheckResult').text() != "正在支付，请稍等") {
        $('#XF_PersonImage').attr('src', 'img/xf-mrHeade.png');
        $('#XF_AccountNo').empty();
        $('#XF_PersonName').empty();
        $('#XF_ConsumeMoney').empty();
        $('#XF_PersonMoney').empty();
        $('#XF_CheckResult').empty();
        $("#XF_Similar").empty();
        //此处追加人脸关闭识别接口
        if (androidClient.getValue("DeviceCheck") == "刷卡加人脸" || androidClient.getValue("DeviceCheck") == "只刷卡") {
            androidClient.SpeechPlay("请重新刷卡");
            androidClient.setValue("CheckAccountNo", "");
        } else {
            androidClient.SpeechPlay("请重新识别");
        }
        GotoPage("checkface");
    }
}

function GetPersonMoney(strAccountNo, strCardNo) {
    if (androidClient.getValue("DeviceMode") == "与宝石共同运行") {

        if (androidClient.getValue("CurrDeviceType") == "份饭") {
            //向消费机发送获取消费信息命令
            var SendCardNo = strCardNo;
            SendCardNo = padLeft(DecToHex(SendCardNo), "0", 8).toUpperCase();
            SendCardNo = SendCardNo.substr(6, 2) + SendCardNo.substr(4, 2) + SendCardNo.substr(2, 2) + SendCardNo.substr(0, 2);
            var SendData = "AA1B0020000001" + SendCardNo + "01000000000000000000000000000000000000";
            SendData = SendData + AddCheckOut(SendData, false);
            androidClient.showLog("sendSerialPort:" + PosPort + "  sendSerialData:" + SendData);
            androidClient.sendSerialMsg(PosPort, SendData);
        }
    } else {
        if (androidClient.IsOnNet() == true && androidClient.getValue("ConnectServer") == "true") {
            if (androidClient.getValue("ConsumeInterfaceType")=="单机版"){
                var strServerPath = androidClient.getValue("ServerPath");
                var url = strServerPath + "getpersonmoney";
                var data='{"incrementalList":[{"EquipmentId":'+androidClient.getValue("ControllerNo")+',"AccountNo":"'+strAccountNo+'","CardNo":"'+strCardNo+'"}]}';
                androidClient.saveLog("getpersonmoney:" + data);
                $.ajax(url, {
                    data: data,
                    headers:{'Content-Type':'application/json;charset=utf8'},
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 5000, //超时时间设置为10秒；
                    success: function (result) {
                        androidClient.saveLog("getpersonmoney:" + JSON.stringify(result));
                        //                if (result.code==200){
                        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                                $("#XF_Input_Calculator").empty();
                                if (parseFloat(result.data[0].SubsidyMoney) > 0) {
                                    $('#XF_ConsumeMoney').text(result.data[0].SubsidyMoney.toFixed(2));
                                } else {
                                    $('#XF_ConsumeMoney').text(androidClient.getValue("CurrPrice"));
                                }
                            }
                        }
                        //                }
                        if (parseFloat(result.data[0].PersonMoney) >= 0) {
                            $('#XF_PersonMoney').text(result.data[0].PersonMoney.toFixed(2));
                        } else {
                            $('#XF_PersonMoney').text("0.00");
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                                $('#XF_ConsumeMoney').text(androidClient.getValue("CurrPrice"));
                            }
                        }
                    }
                });
            }
            else{
                var strServerPath = androidClient.getValue("ServerPath");
                var url = strServerPath + "ashx/dzbp/SCommunicate.ashx";
                $.ajax(url, {
                    data: {
                        action: "getpersonmoney",
                        AccountNo: strAccountNo,
                        ControllerNo: androidClient.getValue("ControllerNo"),
                        MachineNo: androidClient.getValue("MachineNo"),
                        DeviceType: "份饭"
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 1000, //超时时间设置为10秒；
                    success: function (result) {
                        //                if (result.resultCode=="0"){
                        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                                $("#XF_Input_Calculator").empty();
                                if (result.spendMoney != "") {
                                    $('#XF_ConsumeMoney').text(result.spendMoney.toFixed(2));
                                } else {
                                    $('#XF_ConsumeMoney').text(androidClient.getValue("CurrPrice"));
                                }
                            }
                        }
                        //                }
                        if (result.personMoney != "") {
                            $('#XF_PersonMoney').text(result.personMoney.toFixed(2));
                        } else {
                            $('#XF_PersonMoney').text("0.00");
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                            if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                                $('#XF_ConsumeMoney').text(androidClient.getValue("CurrPrice"));
                            }
                        }
                    }
                });
            }
        } else {
            if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                if ($("#XF_Input_Calculator").text().indexOf('=') == -1) {
                    $('#XF_ConsumeMoney').text(androidClient.getValue("CurrPrice"));
                }
            }
        }
    }
}

function initDictInfo() {
    //如果餐别表为空则初始化餐别表
    var data = androidClient.rawQuery("Select * from DictInfo");
    var result = JSON.parse(data);
    if (result.length == 0) {
        androidClient.execSQL("Insert into DictInfo(DictName)values('早')");
        androidClient.execSQL("Insert into DictInfo(DictName)values('午')");
        androidClient.execSQL("Insert into DictInfo(DictName)values('晚')");
        androidClient.execSQL("Insert into DictInfo(DictName)values('夜')");
        androidClient.setValue("Zao_StartTime", "");
        androidClient.setValue("Zao_EndTime", "");
        androidClient.setValue("Zao_DeviceType", "");
        androidClient.setValue("Zao_MealNo", "");
        androidClient.setValue("Wu_StartTime", "");
        androidClient.setValue("Wu_EndTime", "");
        androidClient.setValue("Wu_DeviceType", "");
        androidClient.setValue("Wu_MealNo", "");
        androidClient.setValue("Wan_StartTime", "");
        androidClient.setValue("Wan_EndTime", "");
        androidClient.setValue("Wan_DeviceType", "");
        androidClient.setValue("Wan_MealNo", "");
        androidClient.setValue("Ye_StartTime", "");
        androidClient.setValue("Ye_EndTime", "");
        androidClient.setValue("Ye_DeviceType", "");
        androidClient.setValue("Ye_MealNo", "");
    }
}

function GotoPage(pagestate){
    strPageState = pagestate;
    if (pagestate=="welcome"){
        $("#btnPassword").show();
        $("#btnBack").hide();
        $("#XF_Welcome").show();
        $("#XF_CheckFace").hide();
        $("#XF_PersonDetail").hide();
        androidClient.hideFace();
        androidClient.closeLedPower();
        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
            if ($("#XF_Input_Calculator").text()==""){
                $("#XF_Input_ConsumeMoney").text(androidClient.getValue("CurrPrice"));
            }
        }
    }
    else if (pagestate=="checkface"){
        $("#btnPassword").hide();
        $("#btnBack").show();
        $("#XF_Welcome").hide();
        $("#XF_CheckFace").show();
        $("#XF_PersonDetail").hide();
        $("#XF_CheckFace_WaitConsume").text($("#XF_Input_ConsumeMoney").text());
        SetFaceOrientationFormat();
        androidClient.openLedPower();
    }
    else if (pagestate=="persondetail"){
        $("#btnPassword").hide();
        $("#btnBack").show();
        $("#XF_Welcome").hide();
        $("#XF_CheckFace").hide();
        $("#XF_PersonDetail").show();
        androidClient.hideFace();
        androidClient.closeLedPower();
    }
}

function onKeyPress(key) {
    try {
        if($('#XF_CheckResult').is(':visible') && $('#XF_CheckResult').text()=="正在支付，请稍等"){
            return false;
        }
        key=key.toLowerCase();
        //连续按三次F3建切换到应急模式
        if (key == "c" || key == "up") {
            strEmergencyKey+=key;
            if (strEmergencyKey=="ccc" || strEmergencyKey=="upupup"){
                if (strPageState=="checkface"){
                    androidClient.hideFace();
                }
                strEmergencyKey="";
                if (androidClient.getValue("EmergencyMode")!="true"){
                    confirm_t_f("确定要切换到应急模式吗？", function(r){
                        if (r){
                            SetEmergencyMode("true");
                        }
                        else{
                            if (strPageState=="checkface"){
                                SetFaceOrientationFormat();
                            }
                        }
                    });
                }
                else{
                    confirm_t_f("确定要恢复到正常模式吗？", function(r){
                        if (r){
                            SetEmergencyMode("false");
                        }
                        else{
                            if (strPageState=="checkface"){
                                SetFaceOrientationFormat();
                            }
                        }
                    });
                }
            }
        }
        else{
            strEmergencyKey="";
        }
        if($(".confirm").is(':visible')){
            if (key == "enter") {
                if ($(".confirmtext").text()=="确定要切换到应急模式吗？"){
                    SetEmergencyMode("true");
                }
                else if ($(".confirmtext").text()=="确定要恢复到正常模式吗？"){
                    SetEmergencyMode("false");
                }
                $(".confirm").remove();
            }
            else if (key == "esc" || key == "a" || key == "d") {
                if (strPageState=="checkface"){
                    SetFaceOrientationFormat();
                }
                $(".confirm").remove();
            }
            return false;
        }
        var strCalculator = $("#XF_Input_Calculator").text();
        if (key == "enter") {
            switch (strPageState){
                case 'welcome':
                    if (strCalculator != "") {
                        if (strCalculator.indexOf('=') == -1) {
                            var result = eval(strCalculator);
                            result = result.toFixed(2);
                            $('#XF_Input_ConsumeMoney').text(result);
                            $("#XF_Input_Calculator").text(strCalculator + "=" + result);
                            androidClient.setValue("CustomDeviceType", "计算器");
                        }
                        androidClient.SpeechPlay("请支付"+$('#XF_Input_ConsumeMoney').text()+"元");
                        //进入人脸识别模块
                        GotoPage("checkface");
                    } else {
                        if ($('#XF_Input_ConsumeMoney').text() != "") {
                            androidClient.SpeechPlay("请支付"+$('#XF_Input_ConsumeMoney').text()+"元");
                            //进入人脸识别模块
                            GotoPage("checkface");
                        } else {
                            androidClient.SpeechPlay("请先输入消费金额后再确认");
                            androidClient.showText("请先输入消费金额后再确认");
                        }
                    }
                    break;
                case 'persondetail':
                    if (androidClient.getValue("PayConfirm") == "是" && $('#XF_CheckResult').text() == "") {
                        if ($('#XF_ConsumeMoney').text() != "") {
                            ConsumeInsertRecord();
                        } else {
                            androidClient.SpeechPlay("请先输入消费金额后再支付");
                            androidClient.showText("请先输入消费金额后再支付");
                        }
                    }
                    break;
            }
        }
        else if (key == "menu" || key == "s") {
            switch (strPageState){
                case 'welcome':
                    androidClient.showSystemManagerDialog(androidClient.getLanguage("系统菜单"),"00","systemmenu");
                    break;
            }
        }
        else if (key=="find" || key == "f") {
            switch (strPageState){
                case 'welcome':
                    androidClient.setValue("FromPage", "index.html");
                    jump("consumesearch.html", "consumesearch.html");
                    break;
            }
        }
        else if (key == "esc" || key == "a" || key == "d") {
            switch (strPageState){
                case 'welcome':
                    $("#XF_Input_Calculator").empty();
                    if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                        $("#XF_Input_ConsumeMoney").text(androidClient.getValue("CurrPrice"));
                    }
                    else{
                        $("#XF_Input_ConsumeMoney").empty();
                    }
                    androidClient.hideSystemManagerDialog();
                    break;
                case 'checkface':
                case 'persondetail':
                    GotoPage("welcome");
                    break;
            }
        }
        else if (key == "back") {
            switch (strPageState){
                case 'welcome':
                    if (strCalculator != "") {
                        if (strCalculator.indexOf('=') != -1) {
                            $("#XF_Input_Calculator").empty();
                            if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1) {
                                $("#XF_Input_ConsumeMoney").text(androidClient.getValue("CurrPrice"));
                            }
                            else{
                                $("#XF_Input_ConsumeMoney").empty();
                            }
                        } else {
                            $("#XF_Input_Calculator").text(strCalculator.substr(0, strCalculator.length - 1));
                        }
                    }
                    if ($("#XF_Input_Calculator").text()=="") {
                        if (androidClient.getValue("CurrDeviceType").indexOf('份饭') != -1){
                            $("#XF_Input_ConsumeMoney").text(androidClient.getValue("CurrPrice"));
                        }
                        else{
                            $("#XF_Input_ConsumeMoney").empty();
                        }
                    }
                    break;
            }
        }
        else {
            switch (strPageState){
                case 'welcome':
                    if (androidClient.getValue("CurrDeviceType") == "份饭") {
                        return false;
                    }
                    if (strCalculator.indexOf('=')!=-1){
                        return false;
                    }
                    var strChar="shiftabcdefghijklmnopqrstuvwxyz";
                    if (strChar.indexOf(key)!=-1){
                        return false;
                    }
                    strChar="+-*/.";
                    if (strChar.indexOf(key)!=-1){
                        if (strCalculator=="" || strChar.indexOf(strCalculator.charAt(strCalculator.length-1))!=-1){
                            return false;
                        }
                        if (key=="." && strCalculator.indexOf('.')!=-1 && strCalculator.lastIndexOf('.')>strCalculator.lastIndexOf('+')){
                            return false;
                        }
                    }
                    if (androidClient.getValue("PlayKeyVoice") == "是") {
                        strChar="0123456789";
                        if (strChar.indexOf(key)!=-1){
                            androidClient.SoundPlay("key_"+key);
                        }
                        else if (key=="."){
                            androidClient.SoundPlay("key_point");
                        }
                        else if (key=="+"){
                            androidClient.SoundPlay("key_add");
                        }
                    }
                    $("#XF_Input_Calculator").text(strCalculator + key);
                    try{
                        var result = eval(strCalculator + key);
                        result = result.toFixed(2);
                        $('#XF_Input_ConsumeMoney').text(result);
                    } catch (err) {
                        return false;
                    }
                    break;
            }
        }
    } catch (err) {
        return false;
    }
}

function SetEmergencyMode(bolState){
    if (bolState=="true"){
        androidClient.setValue("EmergencyMode","true");
        $(".index-content").addClass("emergency-model");
        $("#xfgl_state").removeClass("online");
        $("#xfgl_content").text("应急");
    }
    else
    {
        androidClient.setValue("EmergencyMode","false");
        $(".index-content").removeClass("emergency-model");
        if (androidClient.getValue("ConnectServer") == "true") {
            $("#xfgl_state").addClass("online");
            $("#xfgl_content").text("在线");
        } else {
            $("#xfgl_state").removeClass("online");
            $("#xfgl_content").text("离线");
        }
    }
    if (strPageState=="checkface"){
        SetFaceOrientationFormat();
    }
}

function ShowNormalText(strText){
    clearTimeout(intClearConsumeData);
    androidClient.SpeechPlay(strText);
    $('#XF_CheckResult').text(strText);
    $("#XF_CheckResult").removeClass("red");
    $("#XF_CheckResult").removeClass("green");
}

function ShowSuccessText(strText){
    androidClient.SpeechPlay(strText);
    $('#XF_CheckResult').text(strText);
    $("#XF_CheckResult").removeClass("red");
    $("#XF_CheckResult").addClass("green");
    clearTimeout(intClearConsumeData);
    intClearConsumeData = setTimeout(function(){
        ClearConsumeData();
    }, 2000);
}

function ShowFailText(strText){
    androidClient.SpeechPlay(strText);
    $('#XF_CheckResult').text(strText);
    $("#XF_CheckResult").removeClass("green");
    $("#XF_CheckResult").addClass("red");
    clearTimeout(intClearConsumeData);
    intClearConsumeData = setTimeout(function(){
        ClearConsumeData();
    }, 2000);
}
