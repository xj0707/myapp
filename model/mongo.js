const mongodb = require('mongodb').MongoClient;
const config = {
    Database: {
        host: 'mongodb',
        port: 27017,
        dbName: 'user'
    }
}

// 根据状态判断是否有用户名
let state = (config.Database.user != '' && config.Database.password != '') ? true : false
console.log(state)

// 定义基本类
class DB {
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        };
        return DB.instance;
    }

    constructor() {
        // 存放mongodb连接后的对象
        this.dbClient = '';
        // 初始化连接数据库
        this.connect()
    };

    // 连接
    connect() {
        if (state) {// 有用户名密码
            return new Promise((resolve, reject) => {
                if (!this.dbClient) {
                    mongodb.connect('mongodb://' + config.Database.user + ':' + config.Database.password + '@' + config.Database.host + ':' + config.Database.port + '/', {
                        useNewUrlParser: true
                    }, (err, client) => {
                        if (!err) {
                            this.dbClient = client.db(config.Database.dbName);
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
                    mongodb.connect('mongodb://' + config.Database.host + ':' + config.Database.port + '/', {
                        useNewUrlParser: true
                    }, (err, client) => {
                        if (!err) {
                            this.dbClient = client.db(config.Database.dbName);
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
    };

    // 添加单个
    insertOne(tableName, json) {
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
    // 添加多个
    insertMany(tableName, jsonArr) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).insertMany(jsonArr, (err, result) => {
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
    deleteOne(tableName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).deleteOne(json, (err, result) => {
                    if (!err) {
                        resolve(result);
                        return;
                    };
                    reject(err);
                });
            });
        });
    };
    // 删除多条
    deleteMany(tableName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).deleteMany(json, (err, result) => {
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
    updateOne(tableName, condition, json) {
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
    // 更新多条
    updateMany(tableName, condition, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).updateMany(condition, {
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
    find(tableName, json) {
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
    // 分页查询
    findLimit(tableName, condition, pages, limit, column = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(tableName).find(condition).project(column).skip(limit * pages).limit(limit);
                result.toArray((err, data) => {
                    if (!err) {
                        resolve(data);
                        return;
                    }
                    reject(err);
                });
            });
        });
    }
};

// 导出模块
module.exports = DB.getInstance();