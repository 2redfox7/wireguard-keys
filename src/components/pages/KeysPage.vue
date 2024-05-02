<template>
  <div class="wrapper keys-page">
    <div class="keys-page__list">
      <div v-if="peers.length === 0" class="keys-page__note">
        Список ваших VPN-ключей пуст
      </div>
      <div v-for="peer in peers" v-else :key="peer.name" class="keys-page__key">
        <app-modal
          v-show="isShow"
          :message="false"
          class="keys-page__modal"
          @exit="isShow = false"
        >
          <template #title> Информация о ключе</template>
          <pre
            class="modal__key"
          ><code ref='keyText'>{{ peer.data.config }}</code></pre>
          <img :src="peer.data.qrcode" alt="" class="modal__qr" />
          <template #footer>
            <app-button class="modal__button button_copy">
              <img
                alt=""
                class="keys-page__icon"
                src="@/assets/img/copy-icon.svg"
                @click="copyText(peer.data.config)"
              />
            </app-button>
            <app-button class="modal__button">Скачать</app-button>
            <app-button class="modal__button" @click="isDelete = true"
              >Удалить
            </app-button>
          </template>
        </app-modal>
        <app-modal
          v-show="isDelete"
          :message="true"
          class="keys-page__modal modal_delete"
          @exit="isDelete = false"
        >
          <template #title
            >Подтверждение удаления ключа {{ peer.name }}
          </template>
          Вы точно хотите удалить ключ?
          <template #footer>
            <app-button class="modal__button" @click="isDelete = false"
              >Отмена
            </app-button>
            <app-button class="modal__button" @click="deletePeer(peer.name)"
              >Удалить
            </app-button>
          </template>
        </app-modal>
        <app-input
          :id="peer.name"
          :filename="'key-icon.svg'"
          :model-value="peer.name"
          :readonly="true"
          class="keys-page__input"
          @click="isShow = true"
        >
          {{ peer.name }}
        </app-input>
        <app-button class="keys-page__button">
          <a
            :download="peer.name + '.conf'"
            :href="peer.path"
            class="keys-page__link"
          >
            <img
              alt=""
              class="keys-page__icon"
              src="@/assets/img/download-icon.svg"
            />
          </a>
        </app-button>
        <app-button class="keys-page__button" @click="isDelete = true">
          <img
            alt=""
            class="keys-page__icon"
            src="@/assets/img/delete-icon.svg"
          />
        </app-button>
      </div>
    </div>
    <app-button class="keys-page__button_create" @click="createPeer">
      Создать новый ключ
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AppInput from '@/components/components/AppInput.vue';
import AppButton from '@/components/components/AppButton.vue';
import AppModal from '@/components/components/AppModal.vue';
import { KeyService } from '@/api/KeyService';
import { IPeer } from '@/interface/IPeer';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { AppModal, AppButton, AppInput },
  setup() {
    const route = useRoute();
    const peers = ref<IPeer[]>([]);
    const isShow = ref(false);
    const isDelete = ref(false);

    // Загрузка списка ключей при монтировании компонента
    onMounted(async () => {
      await loadPeers();
    });

    // Загрузка списка ключей
    async function loadPeers() {
      peers.value = await KeyService.getAllKeys(route.params.user as string);
      peers.value.forEach(peer => {
        const blob = new Blob([peer.data.config], { type: 'text/plain' });
        peer.path = window.URL.createObjectURL(blob);
        const qrcodeImage = ref(`data:image/png;base64,${peer.data.qrcode}`);
        peer.data.qrcode = qrcodeImage.value;
      });
    }

    // Удаление ключа
    async function deletePeer(keyName: string) {
      const isSuccess = await KeyService.deleteKey(
        route.params.user as string,
        keyName,
      );
      if (isSuccess) {
        peers.value = peers.value.filter(key => key.name !== keyName);
      }
    }

    // Создание нового ключа
    async function createPeer() {
      const newKey = await KeyService.createKey(route.params.user as string);
      if (newKey) {
        const blob = new Blob([newKey.data.config], { type: 'text/plain' });
        newKey.path = window.URL.createObjectURL(blob);
        const qrcodeImage = ref(`data:image/png;base64,${newKey.data.qrcode}`);
        newKey.data.qrcode = qrcodeImage.value;
        peers.value.push(newKey);
      }
    }

    function copyText(text: string) {
      navigator.clipboard.writeText(text);
    }

    return {
      isShow,
      isDelete,
      copyText,
      peers,
      deletePeer,
      createPeer,
    };
  },
});
</script>

<style lang="scss" scoped>
.keys-page {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: calc(100% - 60px);
    overflow-y: scroll;
  }

  &__note {
    color: lightcoral;
    align-self: center;
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

.modal__qr {
  align-self: center;
}

.button_copy {
  margin-right: auto;
  max-width: 40px;
  background: transparent;
  box-shadow: none;
  color: white;
}
</style>