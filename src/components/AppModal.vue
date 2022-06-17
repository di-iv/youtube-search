<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="modal"
      @mouseup.self="close"
    >
      <app-card
        class="modal__card"
      >
        <slot
          :confirm="confirm"
          :cancel="close"
        />
      </app-card>
    </div>
  </transition>
</template>

<script>
import AppCard from '@/components/AppCard';

export default {
  name: 'AppModal',
  components: { AppCard },
  data() {
    return {
      isOpen: false,
    };
  },
  modalController: null,
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    close() {
      this.$options.modalController.resolve(false);
      this.isOpen = false;
    },
    confirm() {
      this.$options.modalController.resolve(true);
      this.isOpen = false;
    },
    open() {
      let resolve;
      let reject;
      const modalPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });
      this.$options.modalController = { resolve, reject };
      this.isOpen = true;

      return modalPromise;
    },
    handleKeydown(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>
