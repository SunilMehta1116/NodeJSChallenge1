module.exports = function(app,handlers){
app.get('/',handlers.home);
app.get('/postfile',handlers.postFile)
app.post('/postfile',handlers.createFile)
app.get('/showFile/:filename',handlers.showFile)
}