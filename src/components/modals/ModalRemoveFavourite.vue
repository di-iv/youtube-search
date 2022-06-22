<template>
  <app-modal
    ref="modal"
    v-slot="{confirm, cancel}"
    class="modal-favourites"
  >
    <h3>{{ $t('favourites.removeRequest') }} {{ requestName }}?</h3>
    <div class="modal-favourites__buttons">
      <app-button
        class="modal-favourites__button"
        style-type="outline"
        :text="$t('favourites.cancel')"
        @click="cancel"
      />
      <app-button
        class="modal-favourites__button"
        size="medium"
        style-type="fill"
        :text="$t('favourites.remove')"
        @click="confirm"
      />
    </div>
  </app-modal>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppModal from '@/components/AppModal';

export default {
  name: 'ModalRemoveFavourite',
  components: {
    AppButton,
    AppModal,
  },
  data() {
    return {
      requestName: '',
    };
  },
  methods: {
    open(data) {
      this.requestName = data.name;
      return this.$refs.modal.open();
    },
  },

};
</script>
