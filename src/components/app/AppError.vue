<template>
  <div class="error">
    <div
      v-for="error in errors"
      :key="error"
      class="error__message"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppError',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>
