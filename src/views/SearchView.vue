<template>
  <section class="search">
    <div
      class="search__wrapper container"
      :class="searchClassName"
    >
      <h1 :class="{'search__title': isResultFormType}">
        Поиск видео
      </h1>
      <SearchForm
        :size="formSize"
        :has-icon="isResultFormType"
        :class="{'search__control': isResultFormType}"
        @search="search"
        @add-favourite="switchModalVisibility(true)"
      />

      <div
        v-if="searchResults"
        class="results search__results"
      >
        <div class="search__filter">
          <p class="search__filter-title">
            Видео по запросу  <b>«{{ searchRequest }}»</b>
          </p>
          <div class="search__view-switcher">
            <AppIcon
              icon-name="IconList"
              class="search__view-switcher-icon"
              :class="{'search__view-switcher-icon--active': viewType === 'list'}"
              @click="switchView('list')"
            />
            <AppIcon
              icon-name="IconGrid"
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
  </section>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import SearchForm from '@/components/SearchForm';

export default {
  name: 'SearchView',
  components: {
    SearchForm,
    AppIcon,
  },
  data() {
    return {
      searchResults: null,
      searchRequest: '',
      viewType: 'grid', // list, grid
      showModal: false,
    };
  },
  computed: {
    formSize() {
      return this.searchResults ? 'large' : 'small';
    },
    searchClassName() {
      return `search__wrapper--${this.formType}`;
    },
    formType() {
      return this.searchResults ? 'results' : 'main';
    },
    isResultFormType() {
      return this.searchResults !== null;
    },
  },
  mounted() {
    this.searchResults = this.$store.state.results;
    this.searchRequest = this.$store.state.request;
  },
  methods: {
    search() {
      this.searchResults = this.$store.state.results;
      this.searchRequest = this.$store.state.request;
    },
    switchView(type) {
      this.viewType = type;
    },
    switchModalVisibility(visibility) {
      this.showModal = visibility;
    },
  },
};
</script>
