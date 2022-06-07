<template>
  <div>
    <router-view v-slot="{Component}">
      <transition name="layout">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
};
</script>
