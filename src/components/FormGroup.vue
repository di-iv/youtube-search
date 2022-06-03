<template>
  <component
    :is="tag"
    class="form-group"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    tag: {
      type: String,
      default: 'div',
      required: false,
    },
  },
};
</script>
