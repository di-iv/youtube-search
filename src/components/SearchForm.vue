<template>
  <form
    class="search-form"
    action=""
  >
    <div
      class="search-form__wrapper"
      :class="inputSize"
    >
      <FormGroup
        id="search"
        label="Поиск"
        is-group
        label-hidden
        placeholder="Что хотите посмотреть?"
        size="large"
        :icon-name="iconName"
      />
    </div>
    <AppButton
      text="Найти"
      :is-group="true"
      @click="search"
    />
  </form>
</template>

<script>
import AppButton from '@/components/AppButton';
import FormGroup from '@/components/FormGroup';

export default {
  name: 'SearchForm',
  components: {
    FormGroup,
    AppButton,
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['search'],
  computed: {
    inputSize() {
      return `search-form__wrapper--${this.size}`;
    },
    iconName() {
      return this.hasIcon ? 'IconHeart' : null;
    },
  },
  methods: {
    search() {
      this.$emit('search');
    },
  },
};
</script>
