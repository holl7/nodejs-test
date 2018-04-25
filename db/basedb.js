'use strict'
const sqlite3 = require("sqlite3")
const path = require("path")
const { BaseLib } = require("../base/base")


/**
 * sqlite操作类
 */
class BaseDB {
    constructor(path) {
        this._path = path;
    }

    /**
     * 打开数据库
     */
    async open() {
        BaseLib.mkdirsSync(path.dirname(this._path));
        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(this._path, (error) => {
                resolve(error);
            })
        })
    }



    /**
     * 运行
    * @param {sql语句} sql 
     * @param {参数} params 
     */
    async run(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.run(sql, params, (error) => {
                if (error != null) {
                    resolve(error);
                }
                else {
                    resolve(true);
                }
            })
        })
    }

    /**
         * 获取数据
         * @param {sql语句} sql 
         * @param {参数} params 
         */
    async get(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.get(sql, params, (error, row) => {
                resolve(row);
            })
        })
    }

    async getByParamsAndPage(sql, params, page) {
        params.push(page.num, (page.page - 1) * num);
        sql += "limit ? offset ?";
        return new Promise((resolve, reject) => {
            this._db.get(sql, params, (error, row) => {
                resolve(row);
            })
        })
    }

    /**
     * 
     * @param {sql语句} sql 
     * @param {参数} params 
     */
    async all(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.all(sql, params, (error, rows) => {
                resolve(rows);
            })
        })
    }
}

module.exports = BaseDB;