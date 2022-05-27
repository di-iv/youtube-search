<template>
 <component :is="iconName"></component>
</template>

<script>
import IconLogo from '@/components/icons/IconLogo';
import IconHeart from '@/components/icons/IconHeart';

export default {
  name: 'AppIcon',
  components: {
    IconLogo,
    IconHeart,
  },
  props: {
    iconName: {
      type: String,
    },
  },
};
</script>
