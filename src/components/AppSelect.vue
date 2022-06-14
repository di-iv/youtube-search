<template>
  <div class="select">
    <label
      for="select"
      class="select__label"
    >{{ label }}</label>
    <select
      class="select__select"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    label: {
      type: String,
      default: 'Сортировать по',
      required: false,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>
