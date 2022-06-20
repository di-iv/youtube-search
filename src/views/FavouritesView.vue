<template>
  <section class="favourites">
    <div class="favourites__wrapper container">
      <h1 class="favourites__title">
        Избранное
      </h1>
      <div
        v-if="isFavouritesEmpty"
        class="favourites__requests"
      >
        <div
          v-for="(favourite, idx) in favourites"
          :key="idx"
          class="favourites__requests-item"
        >
          <p
            class="favourites__requests-item-name"
            @mouseup="doRequest(idx)"
          >
            {{ favourite.name }}
          </p>
          <div class="favourites__requests-item-buttons">
            <app-button
              class="favourites__requests-item-button"
              color="primary"
              style-type="link"
              text="Изменить"
              @click="editFavourite(favourite, idx)"
            />
            <app-button
              class="favourites__requests-item-button"
              color="danger"
              style-type="link"
              text="Удалить"
              @click="removeFavourite(favourite, idx)"
            />
          </div>
        </div>
      </div>
      <div v-else>
        Список пуст
      </div>
    </div>
    <ModalEditFavourite ref="modalEdit" />
    <ModalRemoveFavourite ref="modalRemove" />
  </section>
</template>
<script>
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';
import AppButton from '@/components/AppButton';
import ModalRemoveFavourite from '@/components/ModalRemoveFavourite';
import ModalEditFavourite from '@/components/ModalEditFavourite';

export default {
  name: 'FavouritesView',
  components: {
    ModalRemoveFavourite,
    ModalEditFavourite,
    AppButton,
  },
  computed: {
    ...mapState('favourites', { favourites: 'favourites' }),
    ...mapGetters('favourites', ['getFavouriteByIdx']),
    isFavouritesEmpty() {
      return this.favourites.length !== 0;
    },
  },
  mounted() {
    this.getFavourites();
  },
  methods: {
    ...mapActions('search', ['search']),
    ...mapActions('favourites', ['getFavourites']),
    ...mapMutations('favourites', ['editFavourite']),
    ...mapMutations('favourites', ['removeFavourite']),

    async doRequest(idx) {
      const favourite = this.getFavouriteByIdx(idx);
      await this.search({ request: favourite.request });
      await this.$router.push({ name: 'search' });
    },
    async editFavourite(favourite, id) {
      const result = await this.$refs.modalEdit.open(favourite);
      if (result) {
        await this.editFavourite({
          id,
          request: result.request,
          name: result.name,
          order: result.order,
          resultsCount: result.resultsCount,
        });
      }
    },
    async removeFavourite(favourite, id) {
      const result = await this.$refs.modalRemove.open(favourite);
      if (result) {
        await this.removeFavourite(id);
      }
    },
  },
};
</script>
