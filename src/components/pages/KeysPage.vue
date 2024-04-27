<template>
  <div class="wrapper keys-page">
    <div class="keys-page__list">
      <div v-for="key in keys" :key="key.id" class="keys-page__key">
        <app-modal v-show="isShow" class="keys-page__modal" @exit="closeModel">
          <template #title> Информация о ключе</template>
          <pre class="modal__key">
          <code ref='keyText'>
            {{ key.data }}
          </code>
        </pre>
          <template #footer>
            <app-button class="modal__button button_copy">
              <img
                alt=""
                class="keys-page__icon"
                src="@/assets/img/copy-icon.svg"
                @click="copyText"
              />
            </app-button>
            <app-button class="modal__button">Скачать</app-button>
            <app-button class="modal__button">Удалить</app-button>
          </template>
        </app-modal>
        <app-input
          :id="key.id"
          :filename="'key-icon.svg'"
          class="keys-page__input"
          @click="openModel"
        >
          {{ key.id }}
        </app-input>
        <app-button class="keys-page__button">
          <a :download="key.file" :href="key.url" class="keys-page__link">
            <img
              alt=""
              class="keys-page__icon"
              src="@/assets/img/download-icon.svg"
            />
          </a>
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
    <app-button class="keys-page__button_create">
      Создать новый ключ
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppInput from '@/components/components/AppInput.vue';
import AppButton from '@/components/components/AppButton.vue';
import AppModal from '@/components/components/AppModal.vue';

export default defineComponent({
  components: { AppModal, AppButton, AppInput },
  setup() {
    const keys = ref([
      {
        id: 'rus1_0rg045g',
        data:
          '[Interface]\n' +
          'PrivateKey = oPaMoxDUtTiQaB58/R32UL3SqjIiaxj7SKrddIC3kk4=\n' +
          'Address = 10.22.103.225/32\n' +
          'DNS = 8.8.8.8\n\n' +
          '[Peer]\n' +
          'PublicKey = spdTjQ+mcONZ+UYcuUhi3tWEY/y9SvFbj2rZyWMRrRw=\n' +
          'AllowedIPs = 0.0.0.0/0\n' +
          'Endpoint = uk2.wg.finevpn.org:993\n' +
          'PersistentKeepalive = 21',
        url: 'https://via.placeholder.com/150/92c952.png',
        file: '92c952.png',
      },
      {
        id: 'ger7_575h35o',
        data:
          '[Interface]\n' +
          'PrivateKey = oPaMoxDUtTiQaB58/R32UL3SqjIiaxj7SKrddIC3kk4=\n' +
          'Address = 10.22.103.225/32\n' +
          'DNS = 8.8.8.8\n\n' +
          '[Peer]\n' +
          'PublicKey = spdTjQ+mcONZ+UYcuUhi3tWEY/y9SvFbj2rZyWMRrRw=\n' +
          'AllowedIPs = 0.0.0.0/0\n' +
          'Endpoint = uk2.wg.finevpn.org:993\n' +
          'PersistentKeepalive = 21',
        url: 'https://via.placeholder.com/150/771796.png',
        file: '771796.png',
      },
      {
        id: 'rus2_84694j4',
        data:
          '[Interface]\n' +
          'PrivateKey = oPaMoxDUtTiQaB58/R32UL3SqjIiaxj7SKrddIC3kk4=\n' +
          'Address = 10.22.103.225/32\n' +
          'DNS = 8.8.8.8\n\n' +
          '[Peer]\n' +
          'PublicKey = spdTjQ+mcONZ+UYcuUhi3tWEY/y9SvFbj2rZyWMRrRw=\n' +
          'AllowedIPs = 0.0.0.0/0\n' +
          'Endpoint = uk2.wg.finevpn.org:993\n' +
          'PersistentKeepalive = 21',
        url: 'https://via.placeholder.com/150/24f355.png',
        file: '4f355.png',
      },
    ]);
    const isShow = ref(false);
    const keyText = ref<HTMLElement | null>(null);

    function closeModel(value: boolean) {
      isShow.value = value;
    }

    function openModel() {
      isShow.value = true;
    }

    function copyText() {
      navigator.clipboard.writeText(keyText?.value?.textContent || '');
    }

    return {
      isShow,
      closeModel,
      openModel,
      copyText,
      keyText,
      keys,
    };
  },
});
</script>

<style lang="scss" scoped>
.keys-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: calc(100% - 60px);
    overflow-y: scroll;
  }

  &__key {
    display: flex;
    gap: 5px;
    width: 100%;
  }

  &__button {
    max-width: 80px;
  }

  &__link {
    height: 100%;
    width: 100%;
  }

  &__icon {
    height: 100%;
  }

  &__button_create {
    margin-top: auto;
  }
}

.modal__button {
  max-width: 100px;
  background: white;
  color: $red-main;
}

.modal__key {
  white-space: pre-wrap;
}

.button_copy {
  margin-right: auto;
  max-width: 40px;
  background: transparent;
  box-shadow: none;
  color: white;
}
</style>