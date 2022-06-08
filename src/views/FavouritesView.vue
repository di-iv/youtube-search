<template>
  <section class="favourites">
    <div class="favourites__wrapper container">
      <h1 class="favourites__title">
        Избранное
      </h1>
      <div class="favourites__requests">
        <div
          v-for="favourite in favourites"
          :key="favourite"
          class="favourites__requests-item"
        >
          <p class="favourites__requests-item-name">
            {{ favourite.name }}
          </p>
          <div class="favourites__requests-item-buttons">
            <app-button
              text="Изменить"
              style-type="link"
              color="primary"
              class="favourites__requests-item-button"
            />
            <app-button
              text="Удалить"
              style-type="link"
              color="danger"
              class="favourites__requests-item-button"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AppButton from '@/components/AppButton';

export default {
  name: 'FavouritesView',
  components: { AppButton },
  data() {
    return {
      favourites: [],
    };
  },
  mounted() {
    this.favourites = this.$store.state.favorites;
  },
};
</script>
