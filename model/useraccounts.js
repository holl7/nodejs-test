'use strict'

const EventEmitter = require('event')
const User = require('./user')
const Coin = require("./coin")
const Map = require("../base/map")

/**
 * 某个用户拥有的币的集合
 */
class UserAccounts extends EventEmitter {

    /**
     * 
     * @param {*} params 
     */
    constructor(params) {
        this._useraccounts = new Map();
        params.useraccounts.forEach(element => {

            // coins.put(element.coins.id,element.coin);
            // element.coins.forEach(coin => {
            // })
            //是否包含这个人
            if (this._useraccounts.exist(element.id)) {
                let useraccount = this._useraccounts.get(element.id);
                if (!useraccount.exist(element.coin.id)) {
                    let coins = new Map();
                    coins.put(element.coin.id, element.coin);
                    this._useraccounts.put(element.id, coins);
                }
            }
            else {
                let coins = new Map();
                coins.put(element.coin.id, element.coin)
                this._useraccounts.put(element.id, coins);
            }
        });
    }

    /**
     * 
     * @param {*} user 
     * @param {*} coin 
     */
    async add(user, coin, count) {
        // this._count
        if (this._useraccounts.exist(user.id)) {
            //找到该用户账户
            let useraccount = this._useraccounts.get(user.id);
            if (useraccount.exist(coin.id)) {
                let coins = useraccount.get(coin.id);
                coins.count += count;
            }
            else {
                let coins = new Map();
                coin.count = count;
                //
                coins.put(coin.id, coin);
                useraccount.put(user.id, coins);
            }
        }
        else {
            let coins = new Map();
            coin.count = count;
            coins.put(coin.id, coin);
            this._useraccounts.put(user.id, coins);
        }
    }

    /**
     * 卖出
     */

    async sub(user, coin, count) {
        // this._count
        if (this._useraccounts.exist(user.id)) {
            //找到该用户账户
            let useraccount = this._useraccounts.get(user.id);
            if (useraccount.exist(coin.id)) {
                let coins = useraccount.get(coin.id);
                if (coins.count >= count) {
                    coins.count -= count;
                }
            }
        }
    }
}

module.exports = UserAccounts;