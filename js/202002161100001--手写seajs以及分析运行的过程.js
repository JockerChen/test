// 1、对于seajs重要的3个函数的使用
// use函数有两个参数一个参数是路径，一个参数是回调函数
// seajs.use("../js/info.js",function(moudle){
    // require("1.js");//难点
    let mod2=require("mod2.js");
    let mod3=require("mod3.jg");
// })

//模块文件构成内容
// define(function(require,exports,moudle){

// });
// define 函数不是原生js定义的是自己定义的，所以这个需要构建一个define函数
//技巧：软编译

const sea={
    use(path,fn_end){
        $.ajax({
            url:path,
            success(data){
                //
                function define(fn)
                {
                    let moudle ={
                        exports:{}
                    }
                    //运行
                    fn(function(){},moudle.exports,moudle);
                    console.log(moudle.exports);
                    //对应的是返回到前端的moudle.exports  use函数返回对应的参数给前端用，use的第二个参数
                    fn_end(moudle.exports);
                }
                //requrie 第一步设计把所有的require都找出来

                //require 第二步设计

                eval(data);
                
            },
            error(){
                alert("失败了");
            }
        })

    }
}