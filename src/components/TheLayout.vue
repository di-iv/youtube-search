<template>
  <transition name="layout">
    <component :is="layoutComponent" />
  </transition>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout';

export default {
  name: 'TheLayout',
  components: {
    EmptyLayout,
  },
  computed: {
    layoutComponent() {
      return this.$route.meta.layout || EmptyLayout;
    },
  },
};
</script>
