<template>
 <component :is="iconName"></component>
</template>

<script>
import IconLogo from '@/components/icons/IconLogo';

export default {
  name: 'AppIcon',
  components: {
    IconLogo,
  },
  props: {
    iconName: {
      type: String,
    },
  },
};
</script>
