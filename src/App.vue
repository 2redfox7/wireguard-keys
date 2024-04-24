<template>
  <div class="app">
    <header class="header">
      <p class="header__title">WireGuard VPN Keys</p>
      <img
        alt="WireGuard Logo"
        class="header__logo"
        src="@/assets/img/wireguard-icon-logo.svg"
      />
    </header>
    <div class="container">
      <keys-page></keys-page>
    </div>
  </div>
</template>

<script lang="ts">
import KeysPage from '@/components/pages/KeysPage.vue';

export default {
  components: {
    KeysPage,
  },
};
</script>

<style lang="scss">
@import '@/assets/css/styles.module';

.header {
  display: flex;
  padding: 0 30px;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  background: $red-main;
  box-shadow: rgba(0, 0, 0, 0.15) 0 4px 4px;
  font: {
    size: 1.5rem;
    weight: 600;
  }

  &__title {
    color: white;
  }

  &__logo {
    width: 75px;
    height: 75px;
  }
}
</style>