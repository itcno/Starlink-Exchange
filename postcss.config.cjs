// postcss.config.cjs
const pxtoRem = require("postcss-pxtorem");

module.exports = {
  plugins: [
    pxtoRem({
      rootValue: 100,
      propList: ["*"],
      minPixelValue: 1,
      // ⭐ 关键：使用函数排除 node_modules 中的所有文件
      exclude: function(file) {
        // 如果文件路径包含 node_modules，则排除（返回 true）
        if (file && file.includes("node_modules")) {
          return true;
        }
        return false;
      },
    }),
  ],
};
