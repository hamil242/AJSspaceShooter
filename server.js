var app = require('express')();
app.set('port', process.env.VCAP_APP_PORT || 3000);

var serveStatic = require('serve-static');

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
module.exports = app;

app.use(serveStatic(__dirname));

var dBhighScore = require('./Node/DBhighScore');
