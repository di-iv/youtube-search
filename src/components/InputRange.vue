<template>
  <div class="input-range">
    <label
      class="input-range__label"
      for="input"
    >{{ $t('favourites.maxResultsCount') }}</label>
    <div class="input-range__wrapper">
      <input
        v-model.number="value"
        :max="max"
        :min="min"
        class="input-range__slider"
        type="range"
        @input="updateValue"
      >
      <input
        v-model="value"
        :max="max"
        :min="min"
        class="input-range__text"
        type="number"
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
  data() {
    return {
      value: this.modelValue,
    };
  },
  methods: {
    updateValue() {
      if (this.value > this.$props.max) this.value = this.$props.max;
      if (this.value < this.$props.min) this.value = this.$props.min;
      this.$emit('update:modelValue', this.value);
    },
  },
};
</script>
