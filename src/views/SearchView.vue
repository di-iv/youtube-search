<template>
  <section class="search">
    <div
      :class="`search__wrapper--${formType}`"
      class="search__wrapper container"
    >
      <h1 :class="{'search__title': isResultFormType}">
        Поиск видео
      </h1>
      <SearchForm
        ref="searchForm"
        v-model="currentSearchRequest"
        :class="{'search__control': isResultFormType}"
        :has-icon="isResultFormType"
        :size="formSize"
        @search="trySearch"
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
              :class="{'search__view-switcher-icon--active': isListViewType}"
              class="search__view-switcher-icon"
              icon-name="List"
              @click="switchView(listViewType)"
            />
            <AppIcon
              :class="{'search__view-switcher-icon--active': isGridViewType}"
              class="search__view-switcher-icon"
              icon-name="Grid"
              @click="switchView(gridViewType)"
            />
          </div>
        </div>
        <transition
          name="fade"
        >
          <SearchResults
            v-if="isGridViewType"
            :search-results="searchResults"
            class="results__list--grid"
          />
          <SearchResults
            v-else
            :search-results="searchResults"
            class="results__list--list"
          />
        </transition>
      </div>
    </div>
    <ModalAddFavourite ref="modal" />
    <ModalRemoveFavourite ref="modalRemoveFavourite" />
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { searchView } from '@/consts/componentParams';
import Favourites from '@/services/Favourites';
import AppIcon from '@/components/AppIcon';
import ModalAddFavourite from '@/components/ModalAddFavourite';
import ModalRemoveFavourite from '@/components/ModalRemoveFavourite';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

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
      currentSearchRequest: '',
      viewType: searchView.viewType.grid,
      gridViewType: searchView.viewType.grid,
      listViewType: searchView.viewType.list,
    };
  },
  computed: {
    ...mapState('search', { searchResults: 'results' }),
    ...mapState('search', { oldSearchRequest: 'request' }),
    ...mapState('auth', { userId: 'userId' }),
    formSize() {
      if (this.searchResults) {
        return searchView.formSize.large;
      }
      return searchView.formSize.small;
    },
    formType() {
      if (this.searchResults) {
        return searchView.formType.results;
      }
      return searchView.formType.main;
    },
    isResultFormType() {
      return this.searchResults !== null;
    },
    isGridViewType() {
      return this.viewType === searchView.viewType.grid;
    },
    isListViewType() {
      return this.viewType === searchView.viewType.list;
    },
  },
  methods: {
    ...mapActions('search', ['search']),
    ...mapMutations('favourites', ['addFavourite']),
    ...mapMutations('favourites', ['removeFavourite']),
    async trySearch() {
      await this.search({ request: this.currentSearchRequest });
    },
    switchView(type) {
      this.viewType = type;
    },
    async openModalAddFavourite() {
      const { isSuccess, newFavourite } = await this.$refs.modal.open(this.currentSearchRequest);
      if (isSuccess) {
        this.$refs.searchForm.openTooltip();
        this.addFavourite({
          userId: this.userId,
          request: newFavourite.request,
          name: newFavourite.name,
          order: newFavourite.order,
          resultsCount: newFavourite.resultsCount,
        });
      }
    },
    async openModalRemoveFavourite() {
      const modalResult = await this.$refs.modalRemoveFavourite.open(this.currentSearchRequest);
      if (modalResult) {
        const id = Favourites.getIndex('request', this.currentSearchRequest);
        this.removeFavourite(id);
      }
    },
  },
};
</script>
