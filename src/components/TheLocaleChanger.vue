<template>
  <div
    class="locale-changer"
  >
    <button
      v-for="(locale, idx) in $options.locales"
      :key="idx"
      class="locale-changer__locale"
      :class="{'locale-changer__locale--active': isLocaleSelected(locale)}"
      type="button"
      @click="changeLocale(locale)"
    >
      {{ locale }}
    </button>
  </div>
</template>

<script>

import { locales } from '@/consts/globalParams';

export default {
  name: 'TheLocaleChanger',
  locales,
  computed: {
    isLocaleSelected() {
      return (locale) => this.$i18n.locale === locale;
    },
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },

  },
};
</script>
