<template>
  <div class="input">
    <label
      class="input__label"
      :class="[
        labelColor ? `input__label--${labelColor}`: null,
        {
          'input__label--hidden': isLabelHidden,
          'input__label--required': isRequired,
        }]"
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
            'input__field--invalid': isInvalid
          }
        ]"
        :type="type"
        :name="id"
        :placeholder="placeholder"
        :disabled="isDisabled"
        autocomplete="off"
        :value="modelValue"
        @input="updateValue"
      >
      <AppIcon
        v-if="hasIcon"
        class="input__icon"
        :class="{'input__icon--active': isIconActive}"
        :icon-name="iconName"
        @click="onIconClick"
      />
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import { input } from '@/consts/componentParams';

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
  },
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value);
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
