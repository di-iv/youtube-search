<template>
  <button
    class="btn"
    :class="[buttonSize, {'btn--fill': isFill, 'btn--group': isGroup}]"
    type="button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: 'Кнопка',
    },
    isFill: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonSize() {
      return `btn--${this.size}`;
    },
  },
};
</script>
