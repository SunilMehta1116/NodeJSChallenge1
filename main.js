var express = require("express"),
	http = require('http'),
	https = require('https'),
	port = process.env['PORT'] || 3000,
	app = express(),
	handlers = require('./hd.js'),
	middle = require('./mid.js'),
	cluster = require('cluster'),
	fs = require('fs');


middle(app,handlers);
// pfx: fs.readFileSync('b7415527-7a40-4d0d-9cf6-21175bc8f143.pfx')
var options = {
	key: fs.readFileSync('b7415527-7a40-4d0d-9cf6-21175bc8f143.pri-key.pem'),
	cert: fs.readFileSync('b7415527-7a40-4d0d-9cf6-21175bc8f143-pub-cert.pem')
};

if(cluster.isMaster){
 var cpuCount =  require('os').cpus().length;
	 for(var i=0; i<cpuCount;i++){
		cluster.fork();
	 }
	 
	Object.keys(cluster.workers).forEach(function(id){
		console.log(cluster.workers[id].process.pid);
	});
	
}else{
	https.createServer(options,app).listen(port)
	//app.listen(port)
}





console.log('Server running at https://127.0.0.1:' + port + '/');