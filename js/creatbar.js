/*
 * @Author: [JokerChen]
 * @Date: 2020-09-15 09:18:15
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-15 09:28:57
 * @Description: 
 */
//二维码类
var qrcode=function(){}
qrcode.prototype={
	CreatQrCode:function(id,info)
	{
	    jQuery('#' + id).empty().qrcode(toUtf8(info));
	}
};


//将内容转换后为Utf-8
function toUtf8(str) {    
    var out, i, len, c;    
    out = "";    
    len = str.length;    
    for(i = 0; i < len; i++) {    
        c = str.charCodeAt(i);    
        if ((c >= 0x0001) && (c <= 0x007F)) {    
            out += str.charAt(i);    
        } else if (c > 0x07FF) {    
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        } else {    
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        }    
    }    
    return out;    
} 