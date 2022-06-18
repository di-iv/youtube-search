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
      is-label-hidden
      placeholder="Что хотите посмотреть?"
      size="large"
      class="search-form__wrapper"
      :class="`search-form__wrapper--${size}`"
      :icon-name="iconName"
      :is-invalid="isSearchInvalid"
      :is-icon-active="isRequestSaved"
      @on-icon-click="openModal"
      @update:model-value="updateValue"
    />
    <transition name="fade">
      <div
        v-if="isTooltipVisibility"
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
import Favourites from '@/services/Favourites';
import { searchForm } from '@/consts/componentParams';
import { mapState } from 'vuex';

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
      default: searchForm.defaultSize,
      required: false,
      validator(value) {
        const { sizes } = searchForm;
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
      required: true,
    },
  },
  emits: ['search', 'add-favourite', 'update:modelValue', 'remove-favourite'],
  data() {
    return {
      isTooltipVisibility: false,
      isSearchInvalid: false,
      searchRequest: '',
    };
  },
  computed: {
    ...mapState('favourites', { favourites: 'favorites' }),
    iconName() {
      if (this.hasIcon) {
        return searchForm.icon;
      }
      return null;
    },
    isRequestSaved() {
      return !Favourites.checkRequestUnique(this.favourites, this.searchRequest);
    },
  },
  watch: {
    searchRequest() {
      if (this.searchRequest.length > 0) {
        this.isSearchInvalid = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch('favourites/getFavourites');
  },
  methods: {
    search() {
      if (this.searchRequest !== '') {
        this.$emit('search');
        this.$refs.searchInput.blur();
        return;
      }
      this.$refs.searchInput.focus();
      this.isSearchInvalid = true;
    },
    openModal() {
      if (this.isRequestSaved) {
        this.$emit('remove-favourite');
      } else {
        this.$emit('add-favourite');
      }
    },
    openTooltip() {
      this.isTooltipVisibility = true;
      document.addEventListener('click', this.closeTooltip);
    },
    closeTooltip() {
      this.isTooltipVisibility = false;
      document.removeEventListener('click', this.closeTooltip);
    },
    updateValue() {
      this.$emit('update:modelValue', this.searchRequest);
    },
  },
};
</script>
