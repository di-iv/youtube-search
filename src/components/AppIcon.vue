<template>
  <component :is="`Icon${iconName}`" />
</template>

<script>
import IconGrid from '@/components/icons/IconGrid';
import IconList from '@/components/icons/IconList';
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
    IconList,
    IconGrid,
  },
  props: {
    iconName: {
      type: String,
      default: null,
      required: true,
    },
  },
};
</script>
