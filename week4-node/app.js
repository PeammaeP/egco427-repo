var http = require("http");

http
  .createServer(function (request, response) {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    response.end("Hello World\n");
  })
  .listen(8081);


console.log(__filename)
console.log(__dirname)

console.log("Server is running in port 8081");
