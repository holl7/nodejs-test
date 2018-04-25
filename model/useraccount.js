'use strict'

const EventEmitter = require('event')

/**
 * 某个用户拥有多少个什么类型的币
 */
class UserAccount extends EventEmitter {

    /**
     * 
     * @param {*} params 
     */
    constructor(params) {
        this._id = params.id;
        this._userid = params.userid;
        this._count = params.count;
        this._counttype = params.counttype;
        this._price = params.price;
        this._totalprice = paras.totalprice;
    }
}