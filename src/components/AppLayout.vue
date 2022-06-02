<template>
  <component :is="layoutComponent" />
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';

export default {
  name: 'AppLayout',
  components: {
    MainLayout,
    EmptyLayout,
  },
  data() {
    return {
      defaultLayout: 'MainLayout',
    };
  },
  computed: {
    layoutComponent() {
      const { layout } = this.$route.meta;
      if (layout) {
        return layout;
      }
      return this.defaultLayout;
    },
  },
};
</script>
