<template>
  <div class="modal-card">
    <div class="modal-card__modal" :class=className>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    className: {
      type: String,
      default: null,
    },
  },
};
</script>
