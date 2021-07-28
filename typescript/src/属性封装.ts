/*
 * @Author: [JokerChen]
 * @Date: 2021-07-17 17:00:03
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-17 17:26:49
 * @Description:
 */
class FKPerson {
  private _name: string;
  private _age: number;
  constructor(sName: string, iAge: number) {
    this._name = sName;
    this._age = iAge;
  }
  get name() {
    console.log('getName执行了');
    return this._name;
  }
  set name(sName: string) {
    this._name=sName;
  }
  get age() {
    return this._age;
  }
  set age(iAge :number) {
    this._age = iAge;
  }
  // getName(): string {
  //   return this._name;
  // }
  // setName(sName: string): void {
  //   this._name = sName;
  // }
  // getAge(): number {
  //   return this._age;
  // }
  // setAge(iAge: number): void {
  //   if (iAge >= 0) this._age = iAge;
  // }
}

let fkPerson = new FKPerson("小明", 12);
console.log(fkPerson.name);
