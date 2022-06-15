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
    <AppSelect
      v-model="order"
      :options="options"
      class="modal-favorites__form-group"
    />
    <InputRange
      v-model="resultsCount"
      class="modal-favorites__form-group"
    />
    <AppError :errors="errors" />
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
import AppSelect from '@/components/AppSelect';
import InputRange from '@/components/InputRange';
import Favourites from '@/services/Favourites';
import params from '@/utilities/params';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapState } from 'vuex';

export default {
  name: 'ModalEditFavourite',
  components: {
    InputRange,
    AppSelect,
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
      options: params.select.options,
      order: '',
      resultsCount: 0,
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
    ...mapState('favourites', { favourites: 'favorites' }),
    favouritesExceptThisOne() {
      const favourites = [...this.favourites];
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
      this.order = data.order;
      this.resultsCount = data.resultsCount;
      this.id = Favourites.getIndex('request', this.request);
      const res = await this.$refs.modal.open();
      if (res) {
        return {
          request: this.request,
          name: this.name,
          order: this.order,
          resultsCount: this.resultsCount,
        };
      }
      return res;
    },
  },
};
</script>
