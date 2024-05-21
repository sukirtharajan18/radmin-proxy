const http = require("http");
const httpProxy = require("http-proxy");
const { exec } = require("child_process");

const proxy = httpProxy.createProxyServer({});

const target = "http://radmin-ip:8096";

const server = http.createServer((req, res) => {
  if (req.url === "/shutdown") {
    exec("shutdown /s /f /t 0", (error, stdout, stderr) => {
      if (error) {
        console.error(`Shutdown error: ${error}`);
        res.writeHead(500);
        res.end("Internal Server Error");
        return;
      }
      console.log("Shutdown command executed");
      res.writeHead(200);
      res.end("System is shutting down");
    });
  } else {
    proxy.web(req, res, { target }, (error) => {
      console.error("Proxy error:", error);
      res.writeHead(502);
      res.end("Bad Gateway");
    });
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
