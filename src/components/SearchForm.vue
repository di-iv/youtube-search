<template>
  <form-group
    class="search-form"
    tag="form"
    @submit.prevent
  >
    <AppInput
      id="search"
      ref="searchInput"
      v-model="searchRequest"
      label="Поиск"
      label-hidden
      placeholder="Что хотите посмотреть?"
      size="large"
      class="search-form__wrapper"
      :class="`search-form__wrapper--${size}`"
      :icon-name="iconName"
      :is-valid="isSearchValid"
      @on-icon-click="addToFavourite"
    />
    <transition name="fade">
      <div
        v-if="tooltipVisibility"
        class="search-form__tooltip"
      >
        <p class="search-form__tooltip-text">
          Поиск сохранён в разделе «Избранное»
        </p>
        <router-link
          to="/favourites"
          class="search-form__tooltip-link"
        >
          Перейти в избранное
        </router-link>
      </div>
    </transition>
    <AppButton
      text="Найти"
      type="submit"
      style-type="fill"
      @click="search"
    />
  </form-group>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import FormGroup from '@/components/FormGroup';
import params from '@/utilities/params';

export default {
  name: 'SearchForm',
  components: {
    FormGroup,
    AppInput,
    AppButton,
  },
  props: {
    size: {
      type: String,
      default: 'small',
      required: false,
      validator(value) {
        const { sizes } = params.searchForm;
        return sizes.includes(value);
      },
    },
    hasIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      type: String,
      default: null,
      required: true,
    },
  },
  emits: ['search', 'add-favourite', 'update:modelValue'],
  data() {
    return {
      searchRequest: '',
      tooltipVisibility: false,
      isSearchValid: true,
    };
  },
  computed: {
    iconName() {
      if (this.hasIcon) {
        return 'Heart';
      }
      return null;
    },
  },
  watch: {
    searchRequest() {
      if (!this.isSearchValid && this.searchRequest.length > 0) {
        this.isSearchValid = true;
      }
      return this.$emit('update:modelValue', this.searchRequest);
    },
  },
  methods: {
    search() {
      if (this.searchRequest !== '') {
        this.$emit('search');
        this.searchRequest = '';
        this.$refs.searchInput.blur();
        return;
      }
      this.$refs.searchInput.focus();
      this.isSearchValid = false;
    },
    addToFavourite() {
      this.$emit('add-favourite');
    },
    openTooltip() {
      this.tooltipVisibility = true;
      document.addEventListener('click', this.closeTooltip);
    },
    closeTooltip() {
      this.tooltipVisibility = false;
      document.removeEventListener('click', this.closeTooltip);
    },
  },
};
</script>
