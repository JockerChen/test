<<<<<<< HEAD
=======
/*
 * @Author: [JokerChen]
 * @Date: 2020-01-09 13:52:29
 * @LastEditors  : [JokerChen]
 * @LastEditTime : 2020-01-13 18:10:59
 * @Description: 通过模块化处理
 */
>>>>>>> 5117228c0fdb7aef5729c2f6c611351e06281e07
define(function(require,exports,module){
    //require 是引用别的JS
    // let moda=require('a.js');
    // let modb=require('b.js');
<<<<<<< HEAD
    
=======
>>>>>>> 5117228c0fdb7aef5729c2f6c611351e06281e07
    exports.a=12;
    exports.b=5;
    exports.Show=function(c,d){
        console.log(c,d);
    }

<<<<<<< HEAD
    //批量导入
    module.exports={
        a:12,
        b:5,
        add(a,b){
            console.log(a+b);
        }
    }
=======
    
    // //批量导入
    // module.exports={
    //     a:12,
    //     b:5,
    //     add(a,b){
    //         console.log(a+b);
    //     }
    // }
>>>>>>> 5117228c0fdb7aef5729c2f6c611351e06281e07
})