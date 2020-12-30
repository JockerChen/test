<!--
 * @Author: [JokerChen]
 * @Date: 2020-12-30 11:00:30
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-30 15:41:13
 * @Description: 
-->
# E校翼家小程序代码RW记录
## 2020-12-30
##### 1、重复引用，在下方声明的时候原变量有可能被替换掉，正常这块引用完以后，导出的是对应的对象信息，无需重复声明，并且这个创建有可能因为浅拷贝造成原对象的一些信息被覆盖

```javascript
var entityclass = require("../../utils/entityclass");
var entityClassObj = require("../../utils/entityclass");
page login.js--- line 90
var oWeChat = new entityclass.WeChat(res.data.rows[0]);
```

##### 2、将login.js中登录的功能用promise进行改造，现在看着还是比较乱，包括注册的功能

##### 3、more.js 将jumpHomeUrl函数提到共通util中，并将之前的进行判断相关的人员的类型这块代码进行整合。

```javascript
jumpHomeUrl:function (typeId) { 
    console.log("typeId:"+typeId);
    var objUrl = {
      "0":'app/webview/newschool/dzbpxs/universitystudent.html',
      "1":'app/webview/newschool/dzbpjs/universityteacher.html',
      "8":'app/webview/newschool/dzbpjz/jiazhang.html'
    }
    if(typeof objUrl[typeId]!=='string')
    {
      util.showToast('身份值丢失','none');
      return false;
    }
    return objUrl[typeId];
  }
```