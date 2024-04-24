<template>
  <label :for="id" class="input-group">
    <img
      v-if="filename"
      :src="require(`@/assets/img/${filename}`)"
      alt=""
      class="input-group__icon"
    />
    <input :id="id" class="input-group__input" readonly type="text" />
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  filename: string;
}>();
</script>

<style lang="scss" scoped>
.input-group {
  @extend %ui-component;
  border: 3px solid $red-main;
  box-shadow: rgba(0, 0, 0, 0.15) 0 4px 4px;

  &__icon {
    height: 100%;
  }

  &__input {
    border: none;
    outline: none;
    width: 100%;
    caret-color: $red-main;
  }
}
</style>
