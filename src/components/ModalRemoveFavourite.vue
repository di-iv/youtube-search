<template>
  <app-modal
    ref="modal"
    v-slot="{confirm, cancel}"
    class="modal-favorites"
  >
    <h3>Удалить запрос {{ requestName }}?</h3>
    <div class="modal-favorites__buttons">
      <app-button
        style-type="outline"
        text="Отмена"
        class="modal-favorites__button"
        @click="cancel"
      />
      <app-button
        style-type="fill"
        text="Удалить"
        size="medium"
        class="modal-favorites__button"
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
