/**
 * Created by skitsanos on 8/10/17.
 */

var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var bodyParser = require('body-parser')
global.app = express();

process.title = 'App title';
global.app.locals.title = '';

/**
 * Enable support for body parsing
 */
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Sessions support
 */
var session = require('express-session');
global.app.use(session({secret: 'application-secret', resave: false, saveUninitialized: true}));

var flash = require('connect-flash');
global.app.use(flash());

var cookieParser = require('cookie-parser');
global.app.use(cookieParser());


global.app.use(function (req, res, next)
{
    //console.log((req.session.user !== undefined ? req.session.user.username : 'anonymous') + ' - ' + req.path);

    if (req.path === '/login' || req.path.startsWith('/ui')) {
        next();
    }
    else {
        if (!req.session || !req.session.authenticated) {
            res.redirect('/login');
        }
        else {
            next();
        }
    }
});

/**
 * Support for static resources
 */
global.app.use('/ui', express.static('ui/assets'));

var async = require('async');
async.parallel({
    /*types: function (callback)
    {
        var loader = require('./app/utils/schemas-loader');
        loader.load(function ()
        {
            callback(null, global.schemas);
        });
    },*/
    handlers: function (callback)
    {
        var loader = require('./app/utils/handlers-loader');
        loader.load(global.app, function ()
        {
            callback(null, null);
        });
    }
}, function (err, res)
{
    if (err) {
        console.error(err);
    }
    else {
        global.app.listen(process.env.PORT || process.env.VMC_APP_PORT || 3000, function ()
        {
            console.log('-- Running')
        });
    }
});
