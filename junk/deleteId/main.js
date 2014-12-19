var express = require("express"),
	http = require('http'),
	https = require('https'),
	port = process.env['PORT'] || 3000,
	app = express(),
	handlers = require('./hd.js'),
	middle = require('./mid.js');


middle(app,handlers);
app.listen(port)


console.log('Server running at http://127.0.0.1:' + port + '/');