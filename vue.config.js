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
  pwa: {
    name: 'WireGuard VPN Keys',
    themeColor: '#AE373A',
    msTileColor: '#FFFFFF',
    iconPaths: {
      faviconSVG: '@/assets/img/wireguard-icon-logo.svg',
      favicon32: '@/assets/img/wireguard-icon-logo32.png',
      favicon16: '@/assets/img/wireguard-icon-logo16.png',
      appleTouchIcon: '@/assets/img/wireguard-icon-logo.png',
      maskIcon: '@/assets/img/wireguard-icon-logo.svg',
      msTileImage: '@/assets/img/wireguard-icon-logo144.png',
    },
  },
});
