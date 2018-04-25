'use strict'

const BaseDB = require("../../db/basedb")
const User = require("../../model/coin")
const Config = require("../../db/config")
const SQL_INIT_COIN = `CREATE TABLE IF NOT EXISTS TB_COIN (
    "id" CHAR(128) NOT NULL,
    "name" CHAR(128) NOT NULL,
    "price" FLOAT NOT NULL,
    "updatetime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isenable" INT(1) NOT NULL,
    PRIMARY KEY ("id")
);`;


const SQL_INSERT_COIN = "INSERT INTO TB_COIN(ID,NAME,PRICE)VALUES(?,?,?)";
const SQL_UPDATE_COIN = "UPDATE TB_COIN SET NAME=? AND  PRICE=? WHERE ID=?";
const SQL_QUERY_COIN = "SELECT * FROM TB_COIN ORDER BY NAME";

class CoinDb extends BaseDB {
    constructor() {
        super(Config.dbname);
        this.open();
        this.init();
    }
    async init() {
        await this.run(SQL_INIT_COIN);
    }

    async addCoin(coin) {
        return new Promise(async (resolve) => {
            let data = await this.run(SQL_INSERT_USER, [user.id, user.username, user.password]);
            resolve(data);
        })
    }


    async modifyCoin(coin) {
        return new Promise(async (resolve) => {
            let data = await this.run(SQL_UPDATE_COIN, [coin.name, coin.price, coin.id]);
            resolve(data);
        })
    }

    async getAll() {
        return new Promise(async (resolve) => {
            let data = await this.all(SQL_QUERY_COIN);
            resolve(data);
        })
    }

    async getCoinsByPage(page) {
        if (user != null) {
            return new Promise(async (resolve) => {
                let data = await this.getByParamsAndPage(SQL_QUERY_COIN, [], page);
                resolve(data);
            })
        }
    }

    

}