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
      res.end(`
    <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>System Shutdown</title>
            <style>
              body {
                background-color: #000;
                color: #db5b32;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                animation: fadeIn 2s ease-in-out;
              }
              .container {
                text-align: center;
                animation: fadeIn 2s ease-in-out;
              }
              h1 {
                font-size: 3em;
                margin-bottom: 0.5em;
              }
              p {
                font-size: 1.5em;
              }
              img {
                width: 200px;
                height: auto;
                margin-bottom: 1em;
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>System is Shutting Down</h1>
              <p>Your system will shut down shortly.</p>
            </div>
          </body>
          </html>`);
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
