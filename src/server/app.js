var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var qsystem = require('qsystem');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');
var app = express();

qsystem.setBasePath(path.normalize(path.join(__dirname, '../../config')));
qsystem.loadConfig('config.json');
var config = qsystem.getConfig();

app.use(config.basepath, express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cookieParser());

// Load in healthcheck before the access logger so healthcheck requests don't get logged
var healthRoutes = require('./healthcheck');
app.use(healthRoutes);

var accessLogStream = fs.createWriteStream('/var/log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

// Load in your routes
var registerRoutes = require('./registerRoutes');
app.use(registerRoutes);

module.exports = app;
