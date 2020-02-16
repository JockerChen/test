function show()
{
    require("1.js");
    require("2.js");
}

let str=show.toString();
str=str.substring(str.indexOf("{")+1,str.lastIndexOf("}"));

alert(str.match(/require\([^\(\)]+\)/g));