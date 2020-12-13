module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.128.197.32:8080/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
