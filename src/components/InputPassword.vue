<template>
  <AppInput
    id="password"
    v-model="password"
    :icon-name="icon"
    label="Пароль"
    label-color="text-grey"
    :type="type"
    @on-icon-click="togglePasswordVisibility"
    @update:model-value="updateValue"
  />
</template>

<script>
import AppInput from '@/components/AppInput';
import { inputPassword } from '@/consts/componentParams';

export default {
  name: 'InputPassword',
  components: { AppInput },
  props: {
    modelValue: {
      type: String,
      required: true,
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
        return inputPassword.types.password;
      }
      return inputPassword.types.text;
    },
    icon() {
      if (this.isPasswordHidden) {
        return inputPassword.icons.hidden;
      } return inputPassword.icons.visible;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordHidden = !this.isPasswordHidden;
    },
    updateValue() {
      this.$emit('update:modelValue', this.password);
    },
  },
};
</script>
