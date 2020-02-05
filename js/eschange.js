/*
 * @Author: [JokerChen]
 * @Date: 2020-01-15 10:19:56
 * @LastEditors  : [JokerChen]
 * @LastEditTime : 2020-01-15 10:52:58
 * @Description: 
 */
//filter //过滤器
let arr=[12,5,8,99,27,36,75];
//用法和map很像
let result=arr.filter(item=> {
    // if(item%3==0){return true;}
    // else{return false;}
    //简写后的代码
    return item%3==0;
})
let result1=arr.filter(item=>item%3==0);
console.log(result);
console.log(result1);
//第二组
let arrShop=[{
    title:"男士衬衫",price:75},
    {title:"女士包",price:12222},
    {title:"男士包",price:65},
    {title:"女士鞋",price:21000}
];
let resultShop =arrShop.filter(json=>json.price>=10000);
console.log(resultShop);
//forEach
let arrFor=[12,5,9];
let resultArrFor=arrFor.forEach((item,index)=>{
    console.log("index:"+index+"--"+"item:"+item);
})




