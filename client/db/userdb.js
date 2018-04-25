'use strict'

const BaseDB = require("../../db/basedb")
const User = require("../../model/user")
const SQL_INIT_USER = `CREATE TABLE IF NOT EXISTS tb_user (
    "id" CHAR(128),
    "username" CHAR(128),
    "password" CHAR(128),
    "createdtime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);`;
const SQL_INSERT_USER = `INSERT INTO tb_user(id,username,password)values(?,?,?)`;



class UserDB extends BaseDB {
    constructor(path) {
        this._path = path;
        this._db = null;
        init();
    }
    async init() {
        await this._createUserTable();
    }

    async _createUserTable() {
        this._db = new BaseDB(this._path);
        await this._db._open();
        await this._db._run(SQL_INIT_USER);
    }

    async addUser(user) {
        await this._db._run(SQL_INSERT_USER, [user.id, user.username, user.password]);
    }
}