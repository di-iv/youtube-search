<template>
  <section class="favourites">
    <div class="favourites__wrapper container">
      <h1 class="favourites__title">
        {{ $t('favourites.favourites') }}
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
              :text="$t('favourites.change')"
              @click="editFavourite(favourite, idx)"
            />
            <app-button
              class="favourites__requests-item-button"
              color="danger"
              style-type="link"
              :text="$t('favourites.remove')"
              @click="removeFavourite(favourite, idx)"
            />
          </div>
        </div>
      </div>
      <div v-else>
        {{ $t('favourites.listIsEmpty') }}
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
import ModalRemoveFavourite from '@/components/modals/ModalRemoveFavourite';
import ModalEditFavourite from '@/components/modals/ModalEditFavourite';

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
    ...mapState('user', { userId: 'id' }),
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
    ...mapMutations('favourites', { edit: 'editFavourite' }),
    ...mapMutations('favourites', { remove: 'removeFavourite' }),

    async doRequest(idx) {
      const favourite = this.getFavouriteByIdx(idx);
      await this.search({ request: favourite.request });
      await this.$router.push({ name: 'search' });
    },
    async editFavourite(favourite, idx) {
      const result = await this.$refs.modalEdit.open(favourite, idx);
      if (result) {
        await this.edit({
          idx,
          request: result.request,
          name: result.name,
          order: result.order,
          resultsCount: result.resultsCount,
          userId: this.userId,
        });
      }
    },
    async removeFavourite(favourite, idx) {
      const result = await this.$refs.modalRemove.open(favourite);
      if (result) {
        await this.remove({ idx, userId: this.userId });
      }
    },
  },
};
</script>
