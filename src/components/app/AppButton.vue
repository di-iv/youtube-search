<template>
  <button
    class="button"
    :class="[
      `button--${styleType}`,
      buttonSize,
      buttonColor
    ]"
    :type="type"
  >
    {{ text }}
  </button>
</template>

<script>
import { button } from '@/consts/componentParams';

export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    styleType: {
      type: String,
      required: true,
      validator(value) {
        const { styles } = button;
        return styles.includes(value);
      },
    },
    size: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { sizes } = button;
        return sizes.includes(value);
      },
    },
    color: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { colors } = button;
        return colors.includes(value);
      },
    },
    type: {
      type: String,
      default: button.defaultType,
      required: false,
      validator(value) {
        const { types } = button;
        return types.includes(value);
      },
    },
  },
  computed: {
    buttonSize() {
      if (this.size) {
        return `button--${this.size}`;
      }
      return null;
    },
    buttonColor() {
      if (this.color) {
        return `button--${this.color}`;
      }
      return null;
    },
  },
};
</script>
