<template>
  <div>
    <TheHeader />
    <router-view v-slot="{Component}">
      <transition
        name="layout"
        mode="out-in"
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
