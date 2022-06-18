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
        :min="min"
        :max="max"
        :value="modelValue"
        @input="updateValue"
      >
      <input
        class="input-range__text"
        type="number"
        :min="min"
        :max="max"
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
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
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
