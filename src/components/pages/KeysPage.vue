<template>
  <div class="wrapper keys-page">
    <div class="keys-page__list">
      <div v-for="key in keys" :key="key.id" class="keys-page__key">
        <app-modal
          v-show="isShow"
          class="keys-page__modal"
          @exit="isShow = false"
        >
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
                @click="copyText(key.data)"
              />
            </app-button>
            <app-button class="modal__button">Скачать</app-button>
            <app-button class="modal__button"
            @click="isDelete = true">Удалить</app-button>
          </template>
        </app-modal>
        <app-modal
          v-show="isDelete"
          class="keys-page__modal modal_delete"
          :message='true'
          @exit="isDelete = false"
        >
          <template #title>Подтверждение удаления ключа {{ key.id }}</template>
          Вы точно хотите удалить ключ?
          <template #footer>
            <app-button class="modal__button" @click="isDelete = false"
              >Отмена
            </app-button>
            <app-button class="modal__button"
            @click="deleteKey">Удалить</app-button>
          </template>
        </app-modal>
        <app-input
          :id="key.id"
          :filename="'key-icon.svg'"
          class="keys-page__input"
          @click="isShow = true"
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
        <app-button class="keys-page__button" @click="isDelete = true">
          <img
            alt=""
            class="keys-page__icon"
            src="@/assets/img/delete-icon.svg"
          />
        </app-button>
      </div>
    </div>
    <app-button class="keys-page__button_create"
    @click="createKey">
      Создать новый ключ
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AppInput from '@/components/components/AppInput.vue';
import AppButton from '@/components/components/AppButton.vue';
import AppModal from '@/components/components/AppModal.vue';
import { KeyService } from '@/api/KeyService';

export default defineComponent({
  components: { AppModal, AppButton, AppInput },
  setup() {
    const chatId = ref('');
    const keys = ref<{ id: string, name: string, file: string, url: string, data: string }[]>([]);
    const isShow = ref(false);
    const isDelete = ref(false);

    // Загрузка списка ключей при монтировании компонента
    onMounted(async () => {
      await loadKeys();
    });

    // Загрузка списка ключей
    async function loadKeys() {
      keys.value = await KeyService.getAllKeys(chatId.value);
    }

    // Удаление ключа
    async function deleteKey(keyName: string) {
      const isSuccess = await KeyService.deleteKey(chatId.value, keyName);
      if (isSuccess) {
        keys.value = keys.value.filter(key => key.name !== keyName);
      }
    }

    // Создание нового ключа
    async function createKey() {
      const newKey = await KeyService.createKey(chatId.value);
      if (newKey) {
        keys.value.push(newKey);
      }
    }

    function copyText(text: string) {
      navigator.clipboard.writeText(text);
    }

    return {
      isShow,
      isDelete,
      copyText,
      keys,
      deleteKey,
      createKey,
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