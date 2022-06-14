<template>
  <div class="input-range">
    <label
      for="input"
      class="input-range__label"
    >Максимальное количество</label>
    <div class="input-range__wrapper">
      <input
        class="input-range__slider"
        type="range"
        min="0"
        max="50"
        :value="modelValue"
        @input="updateValue"
      >
      <input
        class="input-range__text"
        type="number"
        min="0"
        max="50"
        :value="modelValue"
        @input="updateValue"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputRange',
  props: {
    modelValue: {
      type: Number,
      default: 12,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', Number(e.target.value));
    },
  },
};
</script>
