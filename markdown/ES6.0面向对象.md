# ES6.0面向对象

  ES6.0面向对象：
    - 声明部分：在ES6中面向对象进行了优化
    - 继承部分
### 声明部分
```javascript
//类声明
class UserInfo{
    //属性声明
    constructor(name,pwd){
      this.name=name;
      this.pwd=pwd;
    }
    //方法（可以省掉function）
    showName(){
       console.log(this.name);
    }
    showPwd(){
       console.log(this.pwd);
    }
}
//调用部分
let user=new UserInfo("用户1","密码1");
user.showName();
user.showPwd();
```

### 继承部分
```javascript
//教师信息继承用户信息
class TeacherUserInfo extends UserInfo{
    constructor(name,pwd,level){
      //执行父类的构造函数
      super(name,pwd);
      this.level=level;
    }
    showLevel(){
        console.log(this.level);
    }
}
//学生信息
class StudentUserInfo extends UserInfo{
   constructor(name,pwd,parents){
      super(name,pwd);
      this.parents=parents;
   }
}

```