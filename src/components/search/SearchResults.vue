<template>
  <div
    class="results__list"
  >
    <a
      v-for="result in searchResults"
      :key="result"
      :href="`${youtubeVideoLink}${result.id.videoId}`"
      class="results__item"
      target="_blank"
    >
      <img
        :alt="result.snippet.title"
        :src="result.snippet.thumbnails.medium.url"
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
import { youtubeVideoLink } from '@/consts/globalParams';

export default {
  name: 'SearchResults',
  props: {
    searchResults: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      youtubeVideoLink,
    };
  },
};
</script>
