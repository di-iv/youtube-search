<template>
  <div class="form-group">
    <label
      class="form-group__label"
      :class="{'form-group__label--hidden': labelHidden}"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="form-group__input">
      <input
        :id="id"
        class="form-group__input-field"
        :class="[inputSize, {
          'form-group__input-field--group': isGroup,
          'form-group__input-field--icon': hasIcon,
        }]"
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
        class="form-group__icon"
        :icon-name="iconName"
        @click="iconClicked"
      />
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';

export default {
  name: 'FormGroup',
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
    isGroup: {
      type: Boolean,
      default: false,
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
    },
    modelValue: {
      type: String,
      default: '',
      required: true,
    },
  },
  emits: ['iconClicked', 'update:modelValue'],
  computed: {
    hasIcon() {
      return this.iconName;
    },
    inputSize() {
      return `form-group__input-field--${this.size}`;
    },
  },
  methods: {
    iconClicked() {
      return this.$emit('iconClicked');
    },
  },
};
</script>
