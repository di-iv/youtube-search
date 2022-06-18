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
      :is-invalid="v$.request.$error"
      is-required
    />
    <AppInput
      id="name"
      v-model="name"
      label="Название"
      is-required
      class="modal-favorites__form-group"
      :is-invalid="v$.name.$error"
    />
    <AppSelect
      v-model="order"
      :options="$options.youtubeOrderOptions"
      class="modal-favorites__form-group"
    />
    <InputRange
      v-model="resultsCount"
      class="modal-favorites__form-group"
      :min="$options.youtubeResultsRange.min"
      :max="$options.youtubeResultsRange.max"
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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapState } from 'vuex';
import { generalErrors, youtubeOrderOptions, youtubeResultsRange } from '@/consts/globalParams';
import Favourites from '@/services/Favourites';
import AppButton from '@/components/AppButton';
import AppError from '@/components/AppError';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';
import AppSelect from '@/components/AppSelect';
import InputRange from '@/components/InputRange';

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
  youtubeOrderOptions,
  youtubeResultsRange,
  data() {
    return {
      request: '',
      name: '',
      errors: [],
      id: '',
      v$: useVuelidate(),
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
    isNameUnique() {
      return Favourites.checkNameUnique(this.favouritesExceptThisOne, this.name);
    },
    isRequestUnique() {
      return Favourites.checkRequestUnique(this.favouritesExceptThisOne, this.request);
    },
  },
  methods: {
    async save() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid && this.isNameUnique && this.isRequestUnique) {
        this.$refs.modal.confirm();
        this.errors = [];
        return;
      }
      this.alertErrors();
    },
    alertErrors() {
      this.errors = [];
      if (!this.isRequestUnique) {
        this.errors.push(generalErrors.requestExist);
      }
      if (!this.isNameUnique) {
        this.errors.push(generalErrors.nameExist);
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
