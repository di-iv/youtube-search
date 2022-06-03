<template>
  <form-group
    class="search-form"
    tag="form"
    @submit.prevent
  >
    <div
      class="search-form__wrapper"
      :class="`search-form__wrapper--${size}`"
    >
      <AppInput
        id="search"
        v-model="searchRequest"
        label="Поиск"
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
      @click="search"
    />
  </form-group>
</template>

<script>
import api from '@/api';
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import FormGroup from '@/components/FormGroup';
import params from '@/utilities/params';

export default {
  name: 'SearchForm',
  components: {
    FormGroup,
    AppInput,
    AppButton,
  },
  props: {
    size: {
      type: String,
      default: 'small',
      required: false,
      validator(value) {
        const { sizes } = params.searchForm;
        return sizes.includes(value);
      },
    },
    hasIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['search', 'add-favourite'],
  data() {
    return {
      searchRequest: '',
    };
  },
  computed: {
    iconName() {
      if (this.hasIcon) {
        return 'Heart';
      }
      return null;
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
