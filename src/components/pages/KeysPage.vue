<template>
  <div class="wrapper keys-page">
    <app-modal class="keys-page__modal">
      <template #title> Информация о ключе </template>
      [Interface]<br />
      PrivateKey = oPaMoxDUtTiQaB58/R32UL3SqjIiaxj7SKrddIC3kk4=<br />
      Address = 10.22.103.225/32<br />
      DNS = 8.8.8.8<br /><br />
      [Peer]<br />
      PublicKey = spdTjQ+mcONZ+UYcuUhi3tWEY/y9SvFbj2rZyWMRrRw=<br />
      AllowedIPs = 0.0.0.0/0<br />
      Endpoint = uk2.wg.finevpn.org:993<br />
      PersistentKeepalive = 21<br />
      <template #footer>
        <app-button class="modal__button"> Скачать </app-button>
        <app-button class="modal__button"> Удалить </app-button>
      </template>
    </app-modal>
    <div class="keys-page__key">
      <app-input :filename="'key-icon.svg'" class="keys-page__input">
      </app-input>
      <app-button class="keys-page__button">
        <img
          alt=""
          class="keys-page__icon"
          src="@/assets/img/download-icon.svg"
        />
      </app-button>
      <app-button class="keys-page__button">
        <img
          alt=""
          class="keys-page__icon"
          src="@/assets/img/delete-icon.svg"
        />
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppInput from '@/components/components/AppInput.vue';
import AppButton from '@/components/components/AppButton.vue';
import AppModal from '@/components/components/AppModal.vue';

export default defineComponent({
  components: { AppModal, AppButton, AppInput },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.keys-page__key {
  display: flex;
  gap: 5px;
  width: 100%;
}

.keys-page__button {
  max-width: 80px;
}

.keys-page__icon {
  height: 100%;
}

.modal__button {
  max-width: 100px;
  background: white;
  color: $red-main;
}
</style>