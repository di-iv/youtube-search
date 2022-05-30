<template>
  <component :is="iconName" />
</template>

<script>
import IconLogo from '@/components/icons/IconLogo';
import IconHeart from '@/components/icons/IconHeart';
import IconEye from '@/components/icons/IconEye';
import IconEyeOff from '@/components/icons/IconEyeOff';

export default {
  name: 'AppIcon',
  components: {
    IconLogo,
    IconHeart,
    IconEye,
    IconEyeOff,
  },
  props: {
    iconName: {
      type: String,
      default: null,
    },
  },
};
</script>
