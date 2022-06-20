<template>
  <transition name="layout">
    <component :is="layoutComponent" />
  </transition>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';

export default {
  name: 'TheLayout',
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layoutComponent() {
      return this.$route.meta.layout || EmptyLayout;
    },
  },
};
</script>
