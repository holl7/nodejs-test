'use strict'

const UUID = require("../base/uuid"); 

class User {
    constructor(params) {
        this._id = params.id;
        this._token = params.token;
        this._username = params.username;
        this._password = params.password;
    }

    async create(username, password) {
        this._id = UUID.uuidv1();
        this._username = params.username;
        this._password = params.password;
    }

    async createToken() {
        this._token = UUID.uuidv1();
    }
}

module.exports = User;