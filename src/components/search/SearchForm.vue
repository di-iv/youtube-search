<template>
  <app-form-group
    class="search-form"
    tag="form"
    @submit.prevent
  >
    <AppInput
      id="search"
      ref="searchInput"
      v-model="searchRequest"
      :class="`search-form__wrapper--${size}`"
      :icon-name="iconName"
      :is-icon-active="isIconActive"
      :is-invalid="isSearchInvalid"
      class="search-form__wrapper"
      is-label-hidden
      label="Поиск"
      :placeholder="$t('search.placeholder')"
      size="large"
      @on-icon-click="openModal"
      @update:model-value="updateValue"
    />
    <transition name="fade">
      <div
        v-if="isTooltipVisibility"
        class="search-form__tooltip"
      >
        <p class="search-form__tooltip-text">
          {{ $t('favourites.requestSaved') }}
        </p>
        <router-link
          class="search-form__tooltip-link"
          to="/favourites"
        >
          {{ $t('favourites.goToFavourites') }}
        </router-link>
      </div>
    </transition>
    <AppButton
      style-type="fill"
      :text="$t('search.find')"
      type="submit"
      @click="search"
    />
  </app-form-group>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { searchForm } from '@/consts/componentParams';
import Favourites from '@/entities/Favourites';
import AppButton from '@/components/app/AppButton';
import AppInput from '@/components/app/AppInput';
import AppFormGroup from '@/components/app/AppFormGroup';

export default {
  name: 'SearchForm',
  components: {
    AppFormGroup,
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
    ...mapState('favourites', { favourites: 'favourites' }),
    iconName() {
      if (this.hasIcon) {
        return searchForm.icon;
      }
      return null;
    },
    isRequestSaved() {
      return !Favourites.isRequestUnique(this.favourites, this.searchRequest);
    },
    isSearchRequestNotEmpty() {
      return this.searchRequest.length > 0;
    },
    isIconActive() {
      return this.isRequestSaved;
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
    this.getFavourites();
  },
  methods: {
    ...mapActions('favourites', ['getFavourites']),
    search() {
      if (this.isSearchRequestNotEmpty) {
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
