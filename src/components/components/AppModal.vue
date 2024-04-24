<template>
  <transition name="modal-fade">
    <div class="modal-window_back">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal-window"
        role="dialog"
      >
        <div class="modal-window__header">
          <h1 class="modal-window__title">
            <slot name="title"></slot>
          </h1>
          <div aria-label="Close modal" class="modal-window__button_close">
            <img
              alt=""
              class="modal-window__icon_close"
              src="@/assets/img/cross-icon.svg"
            />
          </div>
        </div>
        <div class="modal-window__body">
          <code class="modal-window__key">
            <slot></slot>
          </code>
        </div>
        <div class="modal-window__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.modal-window_back {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 50%;
  min-height: 300px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

.modal-window__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 35px;
}

.modal-window__title {
  padding: 12px 12px 0;
  font: {
    size: 1.3rem;
    weight: 600;
  }
  margin: 0;
}

.modal-window__button_close {
  padding: 10px 10px 0;
  height: 100%;
}

.modal-window__icon_close {
  height: 100%;
}

.modal-window__body {
  padding: 12px;
}

.modal-window__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 60px;
  margin-top: auto;
  padding: 0 12px;
  background: $red-main;
}

/* ------  Анимация модульного окна  ------ */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
