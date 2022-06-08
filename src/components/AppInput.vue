<template>
  <div class="input">
    <label
      class="input__label"
      :class="{'input__label--hidden': labelHidden}"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="input__wrapper">
      <input
        :id="id"
        ref="input"
        class="input__field"
        :class="[
          `input__field--${size}`,
          {
            'input__field--icon': hasIcon,
            'input__field--invalid': !isValid
          }
        ]"
        :type="type"
        :name="id"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <AppIcon
        v-if="hasIcon"
        class="input__icon"
        :icon-name="iconName"
        @click="onIconClick"
      />
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import params from '@/utilities/params';

export default {
  name: 'AppInput',
  components: {
    AppIcon,
  },
  props: {
    label: {
      type: String,
      default: 'Label',
      required: true,
    },
    labelHidden: {
      type: Boolean,
      default: false,
      required: false,
    },
    id: {
      type: String,
      default: 'label',
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },
    placeholder: {
      type: String,
      default: null,
      required: false,
    },
    iconName: {
      type: String,
      default: null,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      default: 'small',
      required: false,
      validator(value) {
        const { sizes } = params.input;
        return sizes.includes(value);
      },
    },
    modelValue: {
      type: String,
      default: '',
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  emits: ['on-icon-click', 'update:modelValue'],
  computed: {
    hasIcon() {
      return Boolean(this.iconName);
    },
  },
  methods: {
    onIconClick() {
      return this.$emit('on-icon-click');
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
