var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var users = [];
router.get('/signup', function (req, res) {
    res.render('signup', {error:req.session.err});
});

router.post('/signup', function (req, res) {
    getUsers(function (data) {
        var user = data.find(function (item) {
            return item.username == req.body.username;
        });
        if(user){
            req.session.err='用户名已存在,请重新输入';
            res.redirect('/user/signup')
        }else {
            data.push(req.body);
            setUsers(data,function () {
                res.redirect('/user/signin')
            })
        }
    })
});

router.get('/signin',function (req, res) {
    res.render('signin',{error:req.session.err1})
});
router.post('/signin', function (req, res) {
    getUsers(function (data) {
        var user = data.find(function (item) {
            return item.username == req.body.username && item.password == req.body.password;
        });
        if(user){
            res.redirect('/user/welcome')
        }else {
            req.session.err1='用户名或密码错误,请重新输入';
            res.redirect('/user/signin');
        }
    })
});

router.get('/welcome', function (req, res) {
    res.render('welcome', {title: '欢迎页'});
});
function getUsers(callback) {
    fs.readFile('./json/user.json','utf-8',function (err, data) {
        err ? callback([]) : callback(JSON.parse(data));
    })
}
function setUsers(data,callback) {
    fs.writeFile('./json/user.json',JSON.stringify(data),callback);
}
module.exports = router;