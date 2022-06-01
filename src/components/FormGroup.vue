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
    },
    labelHidden: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'label',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: null,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
    },
    modelValue: {
      type: String,
      default: 'test',
    },
  },
  emits: ['iconCliked', 'update:modelValue'],
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
      return this.$emit('iconCliked');
    },
  },
};
</script>
