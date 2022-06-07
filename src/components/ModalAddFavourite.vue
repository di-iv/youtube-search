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
    <AppButton
      text="Не сохранять"
      :is-fill="false"
      size="large"
      class="modal-favorites__button"
      @click="cancel"
    />
    <AppButton
      text="Сохранить"
      size="large"
      class="modal-favorites__button"
      @click="confirm"
    />
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
    open() {
      return this.$refs.modal.open();
    },
  },
};
</script>
