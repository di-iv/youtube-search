<template>
  <component
    :is="tag"
    class="form-group"
  >
    <slot />
  </component>
</template>

<script>
import { formGroup } from '@/consts/componentParams';

export default {
  name: 'FormGroup',
  props: {
    tag: {
      type: String,
      default: formGroup.defaultTag,
      required: false,
    },
  },
};
</script>
