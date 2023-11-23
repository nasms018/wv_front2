import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://52.78.208.249:8080/",
      changeOrigin: true,
    })
  );
};