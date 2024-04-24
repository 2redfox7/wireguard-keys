// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line no-undef
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/styles.module.scss";`,
      },
    },
  },
});
