var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session=require('express-session');
var app = express();
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'lpc'
}));
app.set('view engine', 'html');

app.set('views', path.resolve('views'));

app.engine('html',require('ejs').__express);

app.use(express.static(path.resolve('public')));

var user = require('./routes/user');

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use('/user', user);

app.listen(8080);