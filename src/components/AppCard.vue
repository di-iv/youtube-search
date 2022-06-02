<template>
  <div
    class="card"
    :class="className"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    className: {
      type: String,
      default: null,
    },
  },
};
</script>
