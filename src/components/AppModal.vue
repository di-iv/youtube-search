<template>
  <div
    class="modal"
    @click.self="closeModal"
    @keydown="closeModal"
  >
    <app-card>
      <slot />
    </app-card>
  </div>
</template>

<script>
import AppCard from '@/components/AppCard';

export default {
  name: 'AppModal',
  components: { AppCard },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>
