/*
 * @Author: [JokerChen]
 * @Date: 2021-06-11 14:17:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-03 08:46:44
 * @Description: 
 */
{/* <body>
  <button data-info="first">首页</button>
  <button data-info="up">上一页</button>
  <span id="nowCnt"></span>
  <button data-info="next">下一页</button>
  <button data-info="last">尾页</button>
</body> */}
$(function () {
  console.log(typeof "11111");
  getInfo();
  $('button').on('click', function () {
    var info = $(this).attr("data-info");
    var obj = pageCls.changePageCnt(info);
    console.log(typeof obj);
    if (typeof obj == "object") {
      obj.retArr();
      $('#nowCnt').html(obj.retNowPage());
      var check = obj.retUserArr("4");
      console.log(typeof check);
      console.log(check);
    }
  })
})

//分页类
var PageCls = function () {
  this.arrayList = [];//基础数据源
  this.nowCnt = 1;//当前页码数      
  this.everyCnt = 3; //一页几个 
  this.allCnt=0;
}

//初始化
PageCls.prototype.init = function (arrayList, nowPageCnt, everyCnt) {
  this.arrayList = arrayList;//基础数据源
  this.nowCnt = nowPageCnt || 1;//当前页码数      
  this.everyCnt = everyCnt || 3; //一页几个 
  this.allCnt = Math.ceil(this.arrayList.length / this.everyCnt);
}
//为原型对象属性进行赋值
//展示这本书
PageCls.prototype.changePageCnt = function (action) {
  if (action == "up") {
    if (this.nowCnt != 1) {
      this.nowCnt--;
    }
    else {
      console.log("当前第一页");
      return false;
    }
  }
  else if (action == "next") {
    if (this.nowCnt != Math.ceil(this.arrayList.length / this.everyCnt)) {
      this.nowCnt++;
    }
    else {
      console.log("当前最后页");
      return false;
    }
  }
  else if (action == "first") {
    this.nowCnt = 1;
  }
  else if (action == "last") {
    this.nowCnt = Math.ceil(this.arrayList.length / this.everyCnt);
  }
  return this;
}
//返回当前的数据数据
PageCls.prototype.retArr = function () {
  return this.arrayList.slice((this.nowCnt - 1) * this.everyCnt, (this.nowCnt - 1) * this.everyCnt + this.everyCnt);
}
//返回当前的page的1/2
PageCls.prototype.retNowPage = function () {
  return this.nowCnt + '/' + this.allCnt;
}

//数组过滤
PageCls.prototype.retUserArr = function (info) {
  var aUserArr=this.arrayList.filter(function(item) {
    console.log(typeof item.ListItemId);
    return item.ListItemId.toString().indexOf(info)>-1;
  });

  return aUserArr;

  // return this.arrayList.filter(function(item) {
      
  // });

}
//新增后返回当前页
var menuArray = [];
var pageCls = new PageCls();

function getInfo() {
  $.ajax({
    type: "GET",
    url: "data/data.json",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    dataType: "json",
    success: function (res) {
      if (res.rows) {
        menuArray = res.rows;
        // returnArrayInfo(JSON.stringify(menuArray),res.rows.length,10,1)
        pageCls.init(menuArray, 1, 3);
        console.log( );
      }
    }
  });
}      

// //获取每一页的数据
// function returnArrayInfo(arrList,allCnt,everyCnt,nowPage) {
//   var arr=arrList;
//   console.log(`${arrList}......${arrList}........${everyCnt}........${nowPage}`);    
// }

// //收藏次数
// Book.prototype.collection=function(){
// 	console.log("ID:"+this.id+"收藏次数:100");
// }
