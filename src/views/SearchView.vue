<template>
  <section class="search">
    <div
      :class="`search__wrapper--${formType}`"
      class="search__wrapper container"
    >
      <h1 :class="{'search__title': hasResults}">
        {{ $t('search.searchVideo') }}
      </h1>
      <SearchForm
        ref="searchForm"
        v-model="currentSearchRequest"
        :class="{'search__control': hasResults}"
        :has-icon="hasIcon"
        :size="formSize"
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
            {{ $t('search.videosByRequest') }}  <b>«{{ oldSearchRequest }}»</b>
          </p>
          <div class="search__view-switcher">
            <AppIcon
              :class="{'search__view-switcher-icon--active': isListViewType}"
              class="search__view-switcher-icon"
              icon-name="List"
              @click="switchView($options.listViewType)"
            />
            <AppIcon
              :class="{'search__view-switcher-icon--active': isGridViewType}"
              class="search__view-switcher-icon"
              icon-name="Grid"
              @click="switchView($options.gridViewType)"
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
import Favourites from '@/entities/Favourites';
import AppIcon from '@/components/app/AppIcon';
import ModalAddFavourite from '@/components/modals/ModalAddFavourite';
import ModalRemoveFavourite from '@/components/modals/ModalRemoveFavourite';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';

export default {
  name: 'SearchView',
  components: {
    ModalRemoveFavourite,
    SearchResults,
    ModalAddFavourite,
    SearchForm,
    AppIcon,
  },
  gridViewType: searchView.viewType.grid,
  listViewType: searchView.viewType.list,
  data() {
    return {
      currentSearchRequest: '',
      viewType: searchView.viewType.grid,
    };
  },
  computed: {
    ...mapState('search', { searchResults: 'results' }),
    ...mapState('search', { oldSearchRequest: 'request' }),
    ...mapState('user', { userId: 'id' }),
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
    hasResults() {
      return this.searchResults !== null;
    },
    isGridViewType() {
      return this.viewType === searchView.viewType.grid;
    },
    isListViewType() {
      return this.viewType === searchView.viewType.list;
    },
    hasIcon() {
      return this.hasResults;
    },
  },
  methods: {
    ...mapActions('search', { searchVideos: 'search' }),
    ...mapMutations('favourites', ['addFavourite']),
    ...mapMutations('favourites', ['removeFavourite']),
    async search() {
      await this.searchVideos({ request: this.currentSearchRequest });
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
      const modalResult = await this.$refs.modalRemoveFavourite.open({
        name: this.currentSearchRequest,
      });
      if (modalResult) {
        const idx = Favourites.getIndex('request', this.currentSearchRequest, this.userId);
        this.removeFavourite({ idx, userId: this.userId });
      }
    },
  },
};
</script>
