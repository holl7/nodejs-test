'use strict'

<<<<<<< HEAD
const Util = require("../base/util");
=======
const UUID = require("../base/uuid"); 
>>>>>>> f361646e8b7f15056dcd0f7638a93b23ee47228e

class User {
    constructor(params) {
        this._id = params.id;
        this._token = params.token;
        this._username = params.username;
        this._password = params.password;
    }

    async create(username, password) {
<<<<<<< HEAD
        this._id = Util.uuidv1();
=======
        this._id = UUID.uuidv1();
>>>>>>> f361646e8b7f15056dcd0f7638a93b23ee47228e
        this._username = params.username;
        this._password = params.password;
    }

    async createToken() {
        this._token = UUID.uuidv1();
    }
}

module.exports = User;