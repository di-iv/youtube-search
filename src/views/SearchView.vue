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
        @search="search"
      />
    </div>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm';

export default {
  name: 'SearchView',
  components: {
    SearchForm,
  },
  data() {
    return {
      searchFormType: 'main',
    };
  },
  computed: {
    formSize() {
      return this.searchFormType === 'main' ? 'small' : 'large';
    },
    searchClassName() {
      return `search__wrapper--${this.searchFormType}`;
    },
    isResultFormType() {
      return this.searchFormType !== 'main';
    },
  },
  methods: {
    search() {
      this.searchFormType = 'results';
    },
  },
};
</script>
