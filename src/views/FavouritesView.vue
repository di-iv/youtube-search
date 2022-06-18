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
          <p
            class="favourites__requests-item-name"
            @keydown="doRequest(id)"
            @click="doRequest(id)"
          >
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
              @click="removeFavourite(favourite, id)"
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
import AppButton from '@/components/AppButton';
import ModalRemoveFavourite from '@/components/ModalRemoveFavourite';
import ModalEditFavourite from '@/components/ModalEditFavourite';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'FavouritesView',
  components: {
    ModalRemoveFavourite,
    ModalEditFavourite,
    AppButton,
  },
  computed: {
    ...mapState('favourites', { favourites: 'favorites' }),
    ...mapGetters('favourites', ['getFavouriteById']),
  },
  mounted() {
    this.$store.dispatch('favourites/getFavourites');
  },
  methods: {
    ...mapActions('search', ['search']),

    async doRequest(id) {
      const favourite = this.getFavouriteById(id);
      await this.search({ request: favourite.request });
      await this.$router.push('/search');
    },
    async editFavourite(favourite, id) {
      const result = await this.$refs.modalEdit.open(favourite);
      if (result) {
        this.$store.commit(
          'favourites/editFavourite',
          {
            id,
            request: result.request,
            name: result.name,
            order: result.order,
            resultsCount: result.resultsCount,
          },
        );
      }
    },
    async removeFavourite(favourite, id) {
      const result = await this.$refs.modalRemove.open(favourite);
      if (result) {
        this.$store.commit('favourites/removeFavourite', id);
      }
    },
  },
};
</script>
