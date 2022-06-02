<template>
  <div class="modal">
    <app-card>
      <slot />
    </app-card>
  </div>
</template>

<script>
import AppCard from '@/components/AppCard';

export default {
  name: 'AppModal',
  components: { AppCard },
};
</script>

<style scoped>

</style>
