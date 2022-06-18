<template>
  <div>
    <TheHeader />
    <router-view v-slot="{Component}">
      <transition
        mode="out-in"
        name="layout"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';

export default {
  name: 'MainLayout',
  components: { TheHeader },
};
</script>
