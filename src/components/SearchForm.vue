<template>
  <form
    class="search-form"
    @submit.prevent
  >
    <div
      class="search-form__wrapper"
      :class="inputSize"
    >
      <FormGroup
        id="search"
        v-model="searchRequest"
        label="Поиск"
        is-group
        label-hidden
        placeholder="Что хотите посмотреть?"
        size="large"
        :icon-name="iconName"
        @keyup.enter="search"
        @icon-clicked="addToFavourite"
      />
    </div>
    <AppButton
      text="Найти"
      :is-group="true"
      @click="search"
    />
  </form>
</template>

<script>
import api from '@/api';
import AppButton from '@/components/AppButton';
import FormGroup from '@/components/FormGroup';

export default {
  name: 'SearchForm',
  components: {
    FormGroup,
    AppButton,
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['search', 'add-favourite'],
  data() {
    return {
      searchRequest: '',
    };
  },
  computed: {
    inputSize() {
      return `search-form__wrapper--${this.size}`;
    },
    iconName() {
      return this.hasIcon ? 'IconHeart' : null;
    },
  },
  methods: {
    async search() {
      const response = await api.get('search', {
        params: {
          part: 'snippet',
          maxResults: 12,
          q: this.searchRequest,
        },
      });
      this.$store.dispatch(
        'searchResults',
        { request: this.searchRequest, results: response.data.items },
      );
      this.$emit('search');
    },
    addToFavourite() {
      this.$emit('add-favourite');
    },
  },
};
</script>
