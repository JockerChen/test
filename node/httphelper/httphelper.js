/*
 * @Author: [JokerChen]
 * @Date: 2021-11-29 14:17:13
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-11-29 14:25:38
 * @Description: 
 */
let http=require('http');
let urlUtil=require('url');
let file=require('./file');
let queruString=require('querystring');

let HttpUtil={
  get:function (url,success,error) {
    http.get(url,function (res) {
      var result = "";
      res.setEncoding("UTF-8");
      res.on("data",function(data){
          result += data;
      });
      res.on('error',error);
      res.on('end',function(){
          success(result);
      });
    }).on('error',function() {
      console.log(this.requestError);
    })
  },
  post : function(hostname,port,path,body,acceptType,contentType,success,error){
    var bodyString = "";
    if(body!=null && contentType == "application/json"){
        bodyString = JSON.stringify(body);
    }
    else if(body!=null && contentType == "application/x-www-form-urlencoded"){
        bodyString = querystring.stringify(body);
    }
    var opts = {
      hostname : hostname,
      port : port,
      path : path,
      method: 'post',
      headers : {
          'Accept':acceptType,
          'Content-Type':contentType,
          'Content-Length':bodyString.length
      }
    }

    var req = http.request(opts,function(res){
        var result = "";
        res.setEncoding("UTF-8");
        res.on("data",function(data){
            result += data;
        });
        res.on('error',error);
        res.on('end',function(){
            success(result);
        });
    });
    req.on('error',this.requestError);
    file.writeInFile(req);
    req.write(bodyString);
    req.end();
  },
}