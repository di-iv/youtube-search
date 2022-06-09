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
      required
    />
    <AppInput
      id="name"
      v-model="name"
      label="Название"
      required
      class="modal-favorites__form-group"
      :is-valid="!v$.name.$error"
    />
    <app-error :errors="errors" />
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
import AppError from '@/components/AppError';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';
import Favourites from '@/services/Favourites';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'ModalEditFavourite',
  components: {
    AppError,
    AppButton,
    AppInput,
    AppModal,
  },
  data() {
    return {
      request: '',
      name: '',
      errors: [],
      id: '',
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
  computed: {
    favouritesExceptThisOne() {
      const favourites = [...this.$store.state.favorites];
      favourites.splice(this.id, 1);
      return favourites;
    },
    isNameUniq() {
      return Favourites.checkUniq(this.favouritesExceptThisOne, 'name', this.name);
    },
    isRequestUniq() {
      return Favourites.checkUniq(this.favouritesExceptThisOne, 'request', this.request);
    },
  },
  methods: {
    async save() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid && this.isNameUniq && this.isRequestUniq) {
        this.$refs.modal.confirm();
        this.errors = [];
        return;
      }
      this.alertErrors();
    },
    alertErrors() {
      this.errors = [];
      if (!this.isRequestUniq) {
        this.errors.push('Такой запрос уже существует');
      }
      if (!this.isNameUniq) {
        this.errors.push('Такое имя уже существует');
      }
    },
    async open(data) {
      this.request = data.request;
      this.name = data.name;
      this.id = Favourites.getIndex('request', this.request);
      const res = await this.$refs.modal.open();
      if (res) {
        return { request: this.request, name: this.name };
      }
      return res;
    },
  },
};
</script>
