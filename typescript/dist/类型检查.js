"use strict";
class BasicClass {
    constructor(propInfo, cnt) {
        this.prop = propInfo;
        this.count = cnt;
    }
}
let c = new BasicClass(0, 1);
c.prop = 1111;
