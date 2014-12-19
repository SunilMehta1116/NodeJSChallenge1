var express = require("express"),
	http = require('http'),
	https = require('https'),
	port = process.env['PORT'] || 3000,
	app = express(),
	handlers = require('./hd.js'),
	middle = require('./mid.js'),
	cluster = require('cluster');


middle(app,handlers);

if(cluster.isMaster){
 var cpuCount = require('os').cpus().length;
	 for(var i=0; i<cpuCount;i++){
		cluster.fork();
	 }
	 
	Object.keys(cluster.workers).forEach(function(id){
		console.log(cluster.workers[id].process.pid);
	});
	
}else{
	app.listen(port)
}





console.log('Server running at http://127.0.0.1:' + port + '/');