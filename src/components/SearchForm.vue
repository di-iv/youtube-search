<template>
  <form class="search-form" action="">
    <div class="search-form__wrapper" :class="inputSize">
      <FormGroup
        label="Поиск"
        id="search"
        is-group
        label-hidden
        :icon-name=iconName
        placeholder="Что хотите посмотреть?"
      />
    </div>
    <AppButton text="Найти" :is-group=true />
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
  computed: {
    inputSize() {
      return `search-form__wrapper--${this.size}`;
    },
    iconName() {
      return this.hasIcon ? 'IconHeart' : null;
    },
  },
};
</script>
