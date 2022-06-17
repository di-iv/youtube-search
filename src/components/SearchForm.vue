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
      :is-icon-active="isRequestSaved"
      @on-icon-click="openModal"
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
      default: 'small',
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
      default: '',
      required: true,
    },
  },
  emits: ['search', 'add-favourite', 'update:modelValue', 'remove-favourite'],
  data() {
    return {
      tooltipVisibility: false,
      isSearchValid: true,
      searchRequest: '',
    };
  },
  computed: {
    ...mapState('favourites', { favourites: 'favorites' }),
    ...mapState('search', { request: 'request' }),
    iconName() {
      if (this.hasIcon) {
        return 'Heart';
      }
      return null;
    },
    isRequestSaved() {
      return !Favourites.checkUniq(this.favourites, 'request', this.searchRequest);
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
  mounted() {
    this.$store.commit('favourites/getFavouriteFromStorage');
    this.searchRequest = this.request;
  },
  methods: {
    search() {
      if (this.searchRequest !== '') {
        this.$emit('search');
        this.$refs.searchInput.blur();
        return;
      }
      this.$refs.searchInput.focus();
      this.isSearchValid = false;
    },
    openModal() {
      if (this.isRequestSaved) {
        this.$emit('remove-favourite');
      } else {
        this.$emit('add-favourite');
      }
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
