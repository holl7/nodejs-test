'use strict';

//var User = require('./model/user');

//var user = new User(1, 'afa', 20);
//user.get();


const UUID = require("./base/uuid")

console.log(UUID.uuidv1());
console.log(UUID.uuidv4());
