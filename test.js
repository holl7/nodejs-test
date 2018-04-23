'use strict';

var User = require('./model/user');

var user = new User(1, 'afa', 20);
user.get();