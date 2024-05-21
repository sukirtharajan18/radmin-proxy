const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

const target = "http://radmin-ip:8096";

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target }, (error) => {
    console.error("Proxy error:", error);
    res.writeHead(502);
    res.end("Bad Gateway");
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
