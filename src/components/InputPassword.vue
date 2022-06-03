<template>
  <AppInput
    id="password"
    v-model="password"
    :icon-name="iconName"
    label="Пароль"
    :type="type"
    @on-icon-click="toggleVisibility"
  />
</template>

<script>
import AppInput from '@/components/AppInput';

export default {
  name: 'InputPassword',
  components: { AppInput },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      iconName: 'EyeOff',
      type: 'password',
      password: '',
    };
  },
  computed: {
    isPasswordHidden() {
      return this.type === 'password';
    },
  },
  watch: {
    password() {
      this.$emit('update:modelValue', this.password);
    },
  },
  methods: {
    toggleVisibility() {
      if (this.isPasswordHidden) {
        this.iconName = 'Eye';
        this.type = 'text';
      } else {
        this.iconName = 'EyeOff';
        this.type = 'password';
      }
    },
  },
};
</script>
