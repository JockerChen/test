/*
 * @Author: [JokerChen]
 * @Date: 2021-07-15 08:24:59
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 08:41:08
 * @Description:
 */
interface Alarm {
  alert(): void;
}
interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm, Light {
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
