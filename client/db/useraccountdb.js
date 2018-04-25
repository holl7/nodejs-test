'use strict'

const BaseDB = require("../../db/basedb")
const User = require("../../model/useraccount")
const Config = require("../../db/config")
const SQL_INIT_USERACCOUNT = `CREATE TABLE IF NOT EXISTS TB_USERACCOUNT (
    "userid" CHAR(128) NOT NULL,
    "coinid" CHAR(128) NOT NULL,
    "count" FLOAT NOT NULL,
    "updatetime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("userid","conid")
);`;
const SQL_INSERT_USERACCOUNT = "INSERT INTO TB_USERACCOUNT(userid,coinid,count)values(?,?,?)";
const SQL_QUERY_USERACCOUNT = "SELECT * FROM TB_USERACCOUNT WHERE USERID=?";


class UserAccountDB extends BaseDB {
    constructor() {
        super(Config.dbname);
        this.open();
        this.init();
    }

    async init() {
        await this.run(SQL_INIT_USERACCOUNT);
    }

    async addUserAccount(useraccount) {
        return new Promise(async (resolve) => {
            let data = await this.run(SQL_INSERT_USER, [user.id, user.username, user.password]);
            resolve(data);
        });
    }
}