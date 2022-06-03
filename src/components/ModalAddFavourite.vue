<template>
  <app-modal class="modal-favorites">
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
      @click="save"
    />
  </app-modal>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppModal from '@/components/AppModal';
import AppInput from '@/components/AppInput';

export default {
  name: 'ModalAddFavourite',
  components: {
    AppButton,
    AppInput,
    AppModal,
  },
  emits: ['cancel', 'save'],
  data() {
    return {
      request: '',
      name: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    save() {
      this.$emit('save');
    },
  },
};
</script>
