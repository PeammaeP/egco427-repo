var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
  if (req.url === "/home" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    var myStream = fs.createReadStream(__dirname + "/" + "index.html", "utf8");
    myStream.pipe(res);
    
  } else if (req.url === "/facebook" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    var myStream = fs.createReadStream(
      __dirname + "/" + "facebook.html",
      "utf8"
    );
    myStream.pipe(res);
  }
});
