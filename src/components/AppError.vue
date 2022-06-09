<template>
  <div class="error">
    <div class="error__message">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppError',
  props: {
    text: {
      type: String,
      default: null,
      required: true,
    },
  },
};
</script>
