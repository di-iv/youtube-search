<template>
  <div
    class="results__list"
  >
    <a
      v-for="result in searchResults"
      :key="result"
      class="results__item"
      :href="`https://www.youtube.com/watch?v=${result.id.videoId}`"
      target="_blank"
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
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    searchResults: {
      type: Object,
      required: true,
    },
  },
};
</script>
