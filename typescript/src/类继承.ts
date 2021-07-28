/*
 * @Author: [JokerChen]
 * @Date: 2021-07-17 15:59:23
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-17 16:11:43
 * @Description: 
 */
class Student {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  likeLearn() {
    console.log('学生都学习');
  }
}

class BadStudent extends Student {
  protected age: number;111
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  likeLearn() {
    super.likeLearn();
  }
  likeSwim() {
    console.log(`喜欢游泳`);
  }
}


let stu = new BadStudent("Joker", 12);
stu.likeSwim();