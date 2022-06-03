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
      required: true,
    },
    isFill: {
      type: Boolean,
      default: true,
      required: false,
    },
    size: {
      type: String,
      default: 'small',
      required: false,
    },
    isGroup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    buttonSize() {
      return `btn--${this.size}`;
    },
  },
};
</script>
