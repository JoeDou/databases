var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

exports.send404 = function(response){
  exports.sendResponse(response, "Not Found", 404);
};

exports.collectData = function(request, callback){
  var data = "";
  request.on('data', function(partial){
    data += partial;
  });
  request.on('end', function(){
    var message = JSON.parse(data);
    callback(message);
  });
};