<template>
  <button
    class="btn"
    :class="[
      `btn--${size}`,
      {
        'btn--fill': isFill,
      }
    ]"
    type="button"
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
    isFill: {
      type: Boolean,
      default: true,
      required: false,
    },
    size: {
      type: String,
      default: 'small',
      required: false,
      validator(value) {
        const { sizes } = params.button;
        return sizes.includes(value);
      },
    },
  },
};
</script>
