<template>
  <div class="select">
    <label
      class="select__label"
      for="select"
    >{{ label }}</label>
    <select
      class="select__select"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option.value === modelValue"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { select } from '@/consts/componentParams';

export default {
  name: 'AppSelect',
  props: {
    label: {
      type: String,
      default: select.defaultLabel,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
