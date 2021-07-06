/*
 * @Author: [JokerChen]
 * @Date: 2021-06-11 14:14:39
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-03 08:16:53
 * @Description: 
 */

var info = "enter";
var keyBtnArrObject = [
  {"keyCode": "enter","keyFun":""},
  {"keyCode": "menu","keyFun":"executeMenu"},
  {"keyCode": "S","keyFun":"executeMenu"},
  {"keyCode": "find","keyFun":"executeFind"},
  {"keyCode": "F","keyFun":"executeFind"},
  {"keyCode": "esc","keyFun":"executeEsc"},
  {"keyCode": "A","keyFun":"executeEsc"},
  {"keyCode": "back","keyFun":"executeBack"},
];

  //特殊字符
  var specialChar = ["+", "-", "*", "/"];
  //进行过滤
  var price = 0;
  $(function () {
    console.log(typeof 0.3);
    //键盘点击后进行过滤
    $('input[type="button"]').on('click', function () {
      //此处需要注意数字校验然后*10再进行除10
      var info = $(this).val();
      console.log($(this).val());
      //此处进行修改
      var  fillerKeyBtn = keyBtnArrObject.filter(function(e){
        return e.keyCode==info;
      });
      if (fillerKeyBtn.length > 0) {
        if(fillerKeyBtn[0].keyFun==""){
            // price=$('#allVal').val();
            price = eval($('#allVal').val());
            console.log(price);
        }
        else{
          eval(fillerKeyBtn[0].keyFun+"();");
        }
        $('#allVal').val("");
      }
      else {
        $('#allVal').val($('#allVal').val() + $(this).val());
      }
    })
  })
