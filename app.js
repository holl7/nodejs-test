'use strict';
//express_demo.js 文件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var cookieParser = require('cookie-parser');
var util = require('util');
var userServices = require('./services/userservices');
app.use(cookieParser());



// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })



var multer = require('multer');
app.use(multer({ dest: '/tmp/' }).array('image'))


app.get('/', function (req, res) {
    res.send('Hello World');
});

app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
});

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

app.post('/user/get/:id', function (req, res) {
    console.log("/user post 请求");
    res.send('用户列表页面');
    var id = req.params.id;
    console.log(id);
    var userservicesImpl = new userServices();
    userservicesImpl.getUserById(id);
});

app.post('/user/add', urlencodedParser, function (req, res) {
    console.log("/user add 请求");
    console.log(req);
    //res.send('用户列表页面');
    //console.log(req.params)

    //var userservicesImpl = new userServices();
    //userservicesImpl.addUser('holl7', 1, 30);

    res.send(JSON.stringify({ bresult: true }));
    res.end();
});
app.post('/user/all', async (req, res) => {
    console.log("/user all 请求");
    var userservicesImpl = new userServices();
    var list = await userservicesImpl.getAllUser();
    console.log(JSON.stringify(list));
    res.end(JSON.stringify(list));
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
});

app.get('/index', function (req, res) {

    console.log(__dirname);
    res.sendFile(__dirname + '/public/' + "index.html");
    console.log('Cookies:' + util.inspect(req.cookies));
});


app.post('/process_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});


app.post('/file_upload', function (req, res) {
    //console.log(req.files[0]);  // 上传的文件信息
    var response = null;
    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

app.use(express.static('public'));

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})