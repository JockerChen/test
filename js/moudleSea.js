
/*
 * @Author: [JokerChen]
 * @Date: 2020-01-09 13:52:29
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-08-20 08:55:18
 * @Description: 通过模块化处理
 */
define(function(require,exports,module){
    //require 是引用别的JS
    // let moda=require('a.js');
    // let modb=require('b.js');
    exports.a=12;
    exports.b=5;
    exports.Show=function(c,d){
        console.log(c,d);
    }

    // //批量导入
    // module.exports={
    //     a:12,
    //     b:5,
    //     add(a,b){
    //         console.log(a+b);
    //     }
    // }
})