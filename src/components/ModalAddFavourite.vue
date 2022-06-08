<template>
  <app-modal
    ref="modal"
    v-slot="{confirm, cancel}"
    class="modal-favorites"
  >
    <h3>Сохранить запрос</h3>
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
        text="Не сохранять"
        style-type="outline"
        size="large"
        class="modal-favorites__button"
        @click="cancel"
      />
      <AppButton
        text="Сохранить"
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
  name: 'ModalAddFavourite',
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
    async open() {
      const res = await this.$refs.modal.open();
      if (res) {
        return { request: this.request, name: this.name };
      }
      return res;
    },
  },
};
</script>
