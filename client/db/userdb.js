'use strict'

const BaseDB = require("../../db/basedb")
const User = require("../../model/user")
const Config = require("../../db/config")
const SQL_INIT_USER = `CREATE TABLE IF NOT EXISTS tb_user (
    "id" CHAR(128) NOT NULL,
    "username" CHAR(128) NOT NULL,
    "password" CHAR(128) NOT NULL,
    "createdtime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isenable" INT(1) DEFAULT 1 NOT NULL,
    "token" CHAR(128) NOT NULL,
    PRIMARY KEY ("id")
);`;
const SQL_INSERT_USER = `INSERT INTO tb_user(id,username,password)values(?,?,?)`;
const SQL_QUERY_USER_ALL = `SELECT * FROM TB_USER`;
const SQL_QUERY_USER_BYNAMEANDPWD = "SELECT * FROM TB_USER WHERE username=? and password=?";
const SQL_QUERY_USER_BYID = "SELECT * FROM TB_USER WHERE id=?";
const SQL_QUERY_USER_BYNAME = "SELECT * FROM TB_USER WHERE USERNAME=?";
const SQL_UPDATE_USER_PASSWORD = "UPDATE TB_USER SET PASSWORD=? WHERE ID=?";
const SQL_DELETE_USER = "UPDATE TB_USER SET ISENABLE=0 WHERE ID=?";
const SQL_QUERY_USER_PAGE = "SELECT * FROM TB_USER ORDER BY CREATETIME DESC LIMIT ? OFFSET ?";




class UserDB extends BaseDB {
    constructor() {
        super(Config.dbname);
        this.open();
        this.init();
    }
    async init() {
        await this.run(SQL_INIT_USER);
    }

    async addUser(user) {
        return new Promise(async (resolve) => {
            let data = await this.run(SQL_INSERT_USER, [user.id, user.username, user.password]);
            resolve(data);
        })
    }

    async getAllUser() {
        return new Promise(async (resolve) => {
            let data = await this.all(SQL_QUERY_USER_ALL);
            resolve(data);
        })
    }

    async getUser(username, password) {
        return new Promise(async (resolve) => {
            let data = await this.get(SQL_QUERY_USER_BYID, [username, password]);
            resolve(data);
        });
    }

    async getUserById(id) {
        return new Promise(async (resolve) => {
            let data = await this.get(SQL_QUERY_USER_BYNAMEANDPWD, [id]);
            resolve(data);
        })
    }

    async getUserByName(username) {
        return new Promise(async (resolve) => {
            let data = await this.get(SQL_QUERY_USER_BYNAME, [username]);
            resolve(data);
        })
    }

    async modifyUserPwdBYId(id, pwd) {
        let user = await this.getUserById(id);
        if (user != null) {
            return new Promise(async (resolve) => {
                let data = await this.get(SQL_UPDATE_USER_PASSWORD, [pwd, id]);
                resolve(data);
            })
        }
        resolve(null);
    }

    async delUserById(id) {
        let user = await this.getUserById(id);
        if (user != null) {
            return new Promise(async (resolve) => {
                let data = await this.get(SQL_DELETE_USER, [id]);
                resolve(data);
            })
        }
        resolve(null);
    }

    async getUsersByPage(page) {
        if (user != null) {
            return new Promise(async (resolve) => {
                let data = await this.getByParamsAndPage(SQL_DELETE_USER, [], page);
                resolve(data);
            })
        }
    }

}

module.exports = UserDB;