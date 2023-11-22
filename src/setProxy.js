import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://ec2-52-78-208-249.ap-northeast-2.compute.amazonaws.com:8080/",
      changeOrigin: true,
    })
  );
};