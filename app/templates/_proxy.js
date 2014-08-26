var httpProxy = require('http-proxy');

var config = require('./config/proxy.config.js');
var routes = require('./config/routes.config.js');
var util = require('./misc-util.js');

if(config.injectssl){
  var ssl = require('ssl-root-cas');
  ssl.inject();
}

var proxy = httpProxy.createProxyServer({});

var server = require('http').createServer(function(req, res) {
  var reqIp = util.getRequestIp(req);
  console.log("\033[34m\033[1m ["+util.getCurrentTimeString()+"] \033[0m"+ reqIp + " > " + req.headers.host);

  if(routes.hasOwnProperty(req.headers.host)){
    var routeData = routes[req.headers.host];
    if(util.isType(routeData, "string")){
      proxy.web(req, res, {target: routeData});
    } else if(util.isType(routeData, "object")){
      proxy.web(req, res, routeData);
    } else if(util.isType(routeData, "function")){
      routeData(req, res, proxy);
    } else {
      res.writeHead(502, {'ContentType' : 'text/plain'});
      res.end("Bad Proxy Configuration");
    }
  } else {
    res.writeHead(404, {'ContentType' : 'text/plain'});
    res.end(req.headers.host + " not found");
  }
});

server.listen(config.server.port);
console.log('\033[36m\033[1m Hey Listen! SimpleProxy : ' + config.server.port + ' \033[0m');
