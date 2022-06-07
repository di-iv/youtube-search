<template>
  <section class="search">
    <div
      class="search__wrapper container"
      :class="`search__wrapper--${formType}`"
    >
      <h1 :class="{'search__title': isResultFormType}">
        Поиск видео
      </h1>
      <SearchForm
        ref="searchForm"
        v-model="currentSearchRequest"
        :size="formSize"
        :has-icon="isResultFormType"
        :class="{'search__control': isResultFormType}"
        @search="search"
        @add-favourite="openModalAddFavourite"
      />

      <div
        v-if="searchResults"
        class="results search__results"
      >
        <div class="search__filter">
          <p class="search__filter-title">
            Видео по запросу  <b>«{{ oldSearchRequest }}»</b>
          </p>
          <div class="search__view-switcher">
            <AppIcon
              icon-name="List"
              class="search__view-switcher-icon"
              :class="{'search__view-switcher-icon--active': viewType === 'list'}"
              @click="switchView('list')"
            />
            <AppIcon
              icon-name="Grid"
              class="search__view-switcher-icon"
              :class="{'search__view-switcher-icon--active': viewType === 'grid'}"
              @click="switchView('grid')"
            />
          </div>
        </div>
        <div
          class="results__list"
          :class="`results__list--${viewType}`"
        >
          <a
            v-for="result in searchResults"
            :key="result"
            class="results__item"
            :href="`https://www.youtube.com/watch?v=${result.id.videoId}`"
          >
            <img
              :src="result.snippet.thumbnails.medium.url"
              :alt="result.snippet.title"
              class="results__item-img"
            >
            <div class="results__item-info">
              <h2 class="results__item-title">{{ result.snippet.title }}</h2>
              <h3 class="results__item-description">{{ result.snippet.description }}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
    <ModalAddFavourite
      ref="modal"
    />
  </section>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import ModalAddFavourite from '@/components/ModalAddFavourite';
import SearchForm from '@/components/SearchForm';

export default {
  name: 'SearchView',
  components: {
    ModalAddFavourite,
    SearchForm,
    AppIcon,
  },
  data() {
    return {
      searchResults: null,
      currentSearchRequest: '',
      oldSearchRequest: '',
      viewType: 'grid', // list, grid
    };
  },
  computed: {
    formSize() {
      if (this.searchResults) {
        return 'large';
      }
      return 'small';
    },
    formType() {
      if (this.searchResults) {
        return 'results';
      }
      return 'main';
    },
    isResultFormType() {
      return this.searchResults !== null;
    },
  },
  mounted() {
    this.searchResults = this.$store.state.results;
    this.oldSearchRequest = this.$store.state.request;
  },
  methods: {
    async search() {
      await this.$store.dispatch('search', { request: this.currentSearchRequest });
      this.searchResults = this.$store.state.results;
      this.oldSearchRequest = this.$store.state.request;
    },
    switchView(type) {
      this.viewType = type;
    },
    async openModalAddFavourite() {
      const modalResult = await this.$refs.modal.open();
      if (modalResult) {
        this.$refs.searchForm.openTooltip();
      }
    },
  },
};
</script>
