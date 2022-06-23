<template>
  <div class="input">
    <label
      :class="[
        inputLabelColor,
        {
          'input__label--hidden': isLabelHidden,
          'input__label--required': isRequired,
        }]"
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <div class="input__wrapper">
      <input
        :id="id"
        ref="input"
        :class="[
          `input__field--${size}`,
          {
            'input__field--icon': hasIcon,
            'input__field--invalid': isInvalid
          }
        ]"
        :disabled="isDisabled"
        :name="id"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        autocomplete="off"
        class="input__field"
        @input="updateValue"
      >
      <AppIcon
        v-if="hasIcon"
        :class="{'input__icon--active': isIconActive}"
        :icon-name="iconName"
        class="input__icon"
        @click="onIconClick"
      />
    </div>
  </div>
</template>

<script>
import { input } from '@/consts/componentParams';
import AppIcon from '@/components/app/AppIcon';

export default {
  name: 'AppInput',
  components: {
    AppIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    isLabelHidden: {
      type: Boolean,
      default: false,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: input.defaultType,
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
    isDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      default: input.defaultSize,
      required: false,
      validator(value) {
        const { sizes } = input;
        return sizes.includes(value);
      },
    },
    modelValue: {
      type: String,
      required: true,
    },
    isInvalid: {
      type: Boolean,
      default: false,
      required: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
      required: false,
    },
    labelColor: {
      type: String,
      default: null,
      required: false,
      validator(value) {
        const { labelColors } = input;
        return labelColors.includes(value);
      },
    },
    isIconActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['on-icon-click', 'update:modelValue'],
  computed: {
    hasIcon() {
      return Boolean(this.iconName);
    },
    inputLabelColor() {
      if (this.labelColor) {
        return `input__label--${this.labelColor}`;
      }
      return null;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    onIconClick() {
      return this.$emit('on-icon-click');
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
  },
};
</script>
