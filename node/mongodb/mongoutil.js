/*
 * @Author: [JokerChen]
 * @Date: 2021-08-05 18:18:55
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-08-06 09:03:28
 * @Description: mongodb相关常用使用类数据库封装的方法
 */
const mongodb = require('mongodb').MongoClient;
const config = require('./config');
// 根据状态判断是否有用户名
let state = null;
if (config.username != '' && config.password != '') {// 有用户名密码
  state = true;
} else {// 没有用户名密码
  state = false;
};

//创建类
class app {
  // 多次连接共享实例对象
  static getInstance () {
    if (!app.instance) {
      app.instance = new app();
    };
    // 简化性能提升
    return app.instance;
  }
  //默认初始化执行方法
  constructor() {
    // 存放mongodb连接后的对象
    this.dbClient = '';
    // 初始化连接数据库
    this.connect()
  };

  connect () {
    if (state) {// 有用户名密码
      return new Promise((resolve, reject) => {
        if (!this.dbClient) {
          mongodb.connect('mongodb://' + config.username + ':' + config.password + '@' + config.address + ':' + config.port + '/', {
            useNewUrlParser: true
          }, (err, client) => {
            if (!err) {
              this.dbClient = client.db(config.database);
              resolve(this.dbClient);
            } else {
              reject(err);
            };
          });
        } else {
          resolve(this.dbClient);
        };
      });
    } else {// 没有用户名密码
      return new Promise((resolve, reject) => {
        if (!this.dbClient) {
          mongodb.connect('mongodb://' + config.address + ':' + config.port + '/', {
            useNewUrlParser: true
          }, (err, client) => {
            if (!err) {
              this.dbClient = client.db(config.database);
              resolve(this.dbClient);
            } else {
              reject(err);
            };
          });
        } else {
          resolve(this.dbClient);
        };
      });
    };
  }
  // 添加
  add (tableName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(tableName).insertOne(json, (err, result) => {
          if (!err) {
            resolve(result);
            return;
          };
          reject(err);
        });
      });
    });
  };
  // 删除
  remove (tableName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(tableName).removeOne(json, (err, result) => {
          if (!err) {
            resolve(result);
            return;
          };
          reject(err);
        });
      });
    });
  };
  // 更新
  update (tableName, condition, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(tableName).updateOne(condition, {
          $set: json
        }, (err, result) => {
          if (!err) {
            resolve(result);
            return;
          };
          reject(err);
        });
      });
    });
  };
  // 查询
  find (tableName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let result = db.collection(tableName).find(json);
        result.toArray((err, data) => {
          if (!err) {
            resolve(data);
            return;
          }
          reject(err);
        });
      });
    });
  };
}

// 导出模块

module.exports = {
  abb:app
}