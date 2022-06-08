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
import params from '@/utilities/params';

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
        const { style } = params.button;
        return style.includes(value);
      },
    },
    size: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { sizes } = params.button;
        return sizes.includes(value);
      },
    },
    color: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { colors } = params.button;
        return colors.includes(value);
      },
    },
    type: {
      type: String,
      default: 'button',
      required: false,
      validator(value) {
        const { types } = params.button;
        return types.includes(value);
      },
    },
  },
};
</script>
