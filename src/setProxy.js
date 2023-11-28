import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://ec2-43-200-121-6.ap-northeast-2.compute.amazonaws.com:8080/",
      changeOrigin: true,
    })
  );
};