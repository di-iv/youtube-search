<template>
  <button
    class="btn"
    :class="[
      `btn--${styleType}`,
      size ? `btn--${size}` : null,
      color ? `btn--${color}` : null,
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
      default: 'button',
      required: false,
      validator(value) {
        const { types } = button;
        return types.includes(value);
      },
    },
  },
};
</script>
