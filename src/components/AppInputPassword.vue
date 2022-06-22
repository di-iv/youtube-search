<template>
  <AppInput
    id="password"
    v-model="password"
    :icon-name="icon"
    :is-invalid="isInvalid"
    :type="type"
    :label="$t('auth.password')"
    label-color="text-grey"
    @on-icon-click="togglePasswordVisibility"
    @update:model-value="updateValue"
  />
</template>

<script>
import { inputPassword } from '@/consts/componentParams';
import AppInput from '@/components/AppInput';

export default {
  name: 'AppInputPassword',
  components: { AppInput },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isInvalid: {
      type: Boolean,
      default: false,
      required: false,
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
      }
      return inputPassword.icons.visible;
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
