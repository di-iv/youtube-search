<template>
  <section class="favourites">
    <div class="favourites__wrapper container">
      <h1 class="favourites__title">
        Избранное
      </h1>
      <div
        v-if="favourites.length !== 0"
        class="favourites__requests"
      >
        <div
          v-for="(favourite, id) in favourites"
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
              @click="editFavourite(favourite, id)"
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
      <div v-else>
        Список пуст
      </div>
    </div>
    <ModalEditFavourite ref="modalEdit" />
  </section>
</template>
<script>
import AppButton from '@/components/AppButton';
import ModalEditFavourite from '@/components/ModalEditFavourite';

export default {
  name: 'FavouritesView',
  components: {
    ModalEditFavourite,
    AppButton,
  },
  data() {
    return {
      favourites: [],
    };
  },
  mounted() {
    this.favourites = this.$store.state.favorites;
  },
  methods: {
    async editFavourite(favourite, id) {
      const editResult = await this.$refs.modalEdit.open(favourite);
      if (editResult) {
        this.$store.commit('editFavourite', {
          id, request: editResult.request, name: editResult.name,
        });
      }
    },
  },
};
</script>
