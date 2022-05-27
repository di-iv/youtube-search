<template>
  <div class="form-group">
    <label
      class="form-group__label"
      :class="{'form-group__label--hidden': labelHidden}"
      :for=id
    >
      {{ label }}
    </label>
    <div class="form-group__input">
      <input
        class="form-group__input-field"
        :class="{
          'form-group__input-field--group': isGroup,
          'form-group__input-field--icon': hasIcon
        }"
        :type=type
        :id=id
        :name=id
        :placeholder=placeholder
        :disabled=disabled
      >
      <AppIcon
        v-if="hasIcon"
        class="form-group__icon"
        :iconName=iconName
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
  },
  computed: {
    hasIcon() {
      return this.iconName;
    },
  },
};
</script>
