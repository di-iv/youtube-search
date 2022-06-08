<template>
  <app-modal
    ref="modal"
    v-slot="{confirm, cancel}"
    class="modal-favorites"
  >
    <h3>Изменить запрос</h3>
    <AppInput
      id="request"
      v-model="request"
      label="Запрос"
      class="modal-favorites__form-group"
    />
    <AppInput
      id="name"
      v-model="name"
      label="* Название"
      class="modal-favorites__form-group"
    />
    <div class="modal-favorites__buttons">
      <AppButton
        text="Не изменять"
        style-type="outline"
        size="large"
        class="modal-favorites__button"
        @click="cancel"
      />
      <AppButton
        text="Изменить"
        size="large"
        style-type="fill"
        class="modal-favorites__button"
        @click="confirm"
      />
    </div>
  </app-modal>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';

export default {
  name: 'ModalEditFavourite',
  components: {
    AppButton,
    AppInput,
    AppModal,
  },
  data() {
    return {
      request: '',
      name: '',
    };
  },
  methods: {
    async open(data) {
      this.request = data.request;
      this.name = data.name;
      const res = await this.$refs.modal.open();
      if (res) {
        return { request: this.request, name: this.name };
      }
      return res;
    },
  },
};
</script>
