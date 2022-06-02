<template>
  <app-modal class="modal-favorites">
    <h3>Сохранить запрос</h3>
    <FormGroup
      id="request"
      label="Запрос"
      class="modal-favorites__form-group"
    />
    <FormGroup
      id="name"
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
import FormGroup from '@/components/FormGroup';

export default {
  name: 'ModalAddFavourite',
  components: { AppButton, FormGroup, AppModal },
  emits: ['cancel', 'save'],
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
