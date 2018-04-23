import { resolve } from "path";

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
    async _open() {
        BaseLib.mkdirsSync(path.dirname(this.m_path));
        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(this._path, (error) => {
                resolve(error);
            })
        })
    }

    /**
     * 获取数据
     * @param {sql语句} sql 
     * @param {参数} params 
     */
    async _get(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.get(sql, params, (error, row) => {
                resole(error);
            })
        })
    }

    /**
     * 运行
    * @param {sql语句} sql 
     * @param {参数} params 
     */
    async _run(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.run(sql, params, (error, row) => {
                resole(error);
            })
        })
    }

    /**
     * 
     * @param {sql语句} sql 
     * @param {参数} params 
     */
    async _all(sql, params) {
        return new Promise((resolve, reject) => {
            this._db.all(sql, params, (error, row) => {
                resole(error);
            })
        })
    }
}

module.exports = BaseDB;