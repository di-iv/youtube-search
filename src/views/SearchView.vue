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
        @remove-favourite="openModalRemoveFavourite"
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
        <transition
          name="fade"
        >
          <SearchResults
            v-if="isGridViewType"
            class="results__list--grid"
            :search-results="searchResults"
          />
          <SearchResults
            v-else
            class="results__list--list"
            :search-results="searchResults"
          />
        </transition>
      </div>
    </div>
    <ModalAddFavourite
      ref="modal"
    />
    <ModalRemoveFavourite
      ref="modalRemoveFavourite"
    />
  </section>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import ModalAddFavourite from '@/components/ModalAddFavourite';
import ModalRemoveFavourite from '@/components/ModalRemoveFavourite';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import Favourites from '@/services/Favourites';

export default {
  name: 'SearchView',
  components: {
    ModalRemoveFavourite,
    SearchResults,
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
    isGridViewType() {
      return this.viewType === 'grid';
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
      const modalResult = await this.$refs.modal.open(this.currentSearchRequest);
      if (modalResult) {
        this.$refs.searchForm.openTooltip();
        this.$store.commit('addFavourite', {
          request: modalResult.request,
          name: modalResult.name,
          order: modalResult.order,
          resultsCount: modalResult.resultsCount,
        });
      }
    },
    async openModalRemoveFavourite() {
      const modalResult = await this.$refs.modalRemoveFavourite.open(this.currentSearchRequest);
      if (modalResult) {
        const id = Favourites.getIndex('request', this.currentSearchRequest);
        this.$store.commit('removeFavourite', id);
      }
    },
  },
};
</script>
