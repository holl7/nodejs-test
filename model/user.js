'use strict'

const Util = require("../base/util");

class User {
    constructor(params) {
        this._id = params.id;
        this._token = params.token;
        this._username = params.username;
        this._password = params.password;
    }

    async create(username, password) {
        this._id = Util.uuidv1();
        this._username = params.username;
        this._password = params.password;
    }

    async createToken() {
        this._token = UUID.uuidv1();
    }
}

module.exports = User;