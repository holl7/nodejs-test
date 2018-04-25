'use strict'

const EventEmitter = require('event')


class coin extends EventEmitter {
    constructor(params) {
        this._name = params.name;
        this._price = param.price;
    }
}

module.exports = coin;