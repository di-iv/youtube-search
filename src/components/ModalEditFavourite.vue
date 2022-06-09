<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favorites"
  >
    <h3>Изменить запрос</h3>
    <AppInput
      id="request"
      v-model="request"
      label="Запрос"
      class="modal-favorites__form-group"
      :is-valid="!v$.request.$error"
    />
    <AppInput
      id="name"
      v-model="name"
      label="Название"
      required
      class="modal-favorites__form-group"
      :is-valid="!v$.name.$error"
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
        @click="save"
      />
    </div>
  </app-modal>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

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
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      request: {
        required,
      },
      name: {
        required,
      },
    };
  },
  methods: {
    async save() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid) {
        this.$refs.modal.confirm();
      }
    },
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
