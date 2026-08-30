const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "https://api.openai.com",
      changeOrigin: true,
      pathRewrite: { "^/v1": "/v1" },
      onProxyReq: (proxyReq) => {
        console.log("Proxying:", proxyReq.method, proxyReq.path);
      },
      onProxyRes: (proxyRes) => {
        console.log("Response:", proxyRes.statusCode);
        let body = "";
        proxyRes.on("data", (chunk) => {
          body += chunk;
        });
        proxyRes.on("end", () => {
          console.log("Response body:", body);
        });
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: "Proxy error" } }));
      },
    })
  );
};
