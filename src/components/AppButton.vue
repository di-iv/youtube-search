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
import { validationParams } from '@/consts/params';

export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: 'Кнопка',
      required: true,
    },
    styleType: {
      type: String,
      default: 'fill',
      required: true,
      validator(value) {
        const { style } = validationParams.button;
        return style.includes(value);
      },
    },
    size: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { sizes } = validationParams.button;
        return sizes.includes(value);
      },
    },
    color: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { colors } = validationParams.button;
        return colors.includes(value);
      },
    },
    type: {
      type: String,
      default: 'button',
      required: false,
      validator(value) {
        const { types } = validationParams.button;
        return types.includes(value);
      },
    },
  },
};
</script>
