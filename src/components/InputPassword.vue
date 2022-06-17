<template>
  <AppInput
    id="password"
    v-model="password"
    :icon-name="icon"
    label="Пароль"
    label-color="text-grey"
    :type="type"
    @on-icon-click="togglePasswordVisibility"
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
      isPasswordHidden: true,
      password: '',
    };
  },
  computed: {
    type() {
      if (this.isPasswordHidden) {
        return 'password';
      }
      return 'text';
    },
    icon() {
      if (this.isPasswordHidden) {
        return 'EyeOff';
      } return 'Eye';
    },
  },
  watch: {
    password() {
      this.$emit('update:modelValue', this.password);
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordHidden = !this.isPasswordHidden;
    },
  },
};
</script>
