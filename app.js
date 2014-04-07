/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('x$INVENTARIO%$x'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes/login')(app);

app.post('/signup', function (req, res) {
    AM.addNewAccount({
        name: req.param('name'),
        email: req.param('email'),
        user: req.param('user'),
        pass: req.param('pass'),
        country: req.param('country')
    }, function (e) {
        if (e) {
            res.send(e, 400);
        } else {
            res.send('ok', 200);
        }
    });
});

app.get('/inicio', routes.inicio);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
