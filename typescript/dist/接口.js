"use strict";
class Car {
    alert() {
        console.log("aaa");
    }
    lightOff() {
        console.log("關燈");
    }
    lightOn() {
        console.log("開燈");
    }
}
{
    let car = new Car();
    car.alert();
    car.lightOn();
    car.lightOff();
}
