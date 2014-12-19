
var formidable = require('formidable'),
	fs = require('fs'),
	util = require('util');


exports.home = function home(req, res)	{
res.setHeader("Content-Type","text/html");
res.send('<html><head><h3>Upload a File</h3></head><body><a href="/postfile">Go to IMAGE UPLOAD</a></body></html>')
}


exports.postFile =function postFile(req,res){
res.setHeader("Content-Type","text/html");
res.send('<html><head><title>File Uploads</title>	</head>	<body>	UPLOAD THE FILE HERE !<form method="post" enctype="multipart/form-data" action="/postfile"><input type="file" name="the_file"></input><input type="Submit">Submit File</input></form></body></html>');

}


exports.createFile = function createFile(req,res){
 
var form = new formidable.IncomingForm();
form.uploadDir = "temp";
form.keepExtensions = true;
form.multiples = false;


  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('<html><head>	UPLOAD THE FILE HERE !</head><body>	<p>The file '+ files.the_file.name+' has been uploaded. Please click <a href="/showFile/'+ files.the_file.name + '" >here</a>  to view the image</p></body></html>');
      res.end(util.inspect(files.the_file.name));
    });

	
	
	  form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'D:/Office Tasks/Training/NodeCodeChallenge/uploads/';
 
         fs.rename(temp_path, new_location + file_name, function(err) {  
             if (err) {
                 console.error(err);
             } else {
                 console.log("success!")
             }
         });
    });	
 //console.log(req.files.the_file);
}



exports.showFile = function showFile(req,res){
var filePath = 'uploads/'+req.params.filename;
res.download(filePath);

}