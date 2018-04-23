var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin123!@#',
    database: 'nodesql',
    port: 3306
});

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin123!@#',
    database: 'nodesql',
    port: 3306
});

var UserServices = function () {
    this.getUserById = function (id) {
        var sql = "select * from tb_user where id=" + id;
        con.query(sql, function (err, results, fields) {
            if (err) throw err;
            console.log('The solution is: ', results[0]);
            return results[0];
        });
        con.end();
    }

    this.addUser = function (name, sex, age) {
        var sql = "insert into tb_user(name,sex,age)values('" + name + "'," + sex + "," + age + ")";
        console.log(sql);
        con.query(sql, function (err, results) {
            if (err) console.log(err);
            console.log("INSERT Return ==> ");
            console.log(results);
        });
        con.end();
    }

    this.getAllUser = async function () {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                var sql = "select * from tb_user;";
                conn.query(sql, function (err, rows) {
                    if (err) console.log(err);
                    var result = rows;
                    resolve(result);
                });
                conn.release();
            })
        });
    }
}

module.exports = UserServices;