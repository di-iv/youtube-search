<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favourites"
  >
    <h3>Изменить запрос</h3>
    <AppInput
      id="request"
      v-model="request"
      :is-invalid="v$.request.$error"
      class="modal-favourites__form-group"
      is-required
      label="Запрос"
    />
    <AppInput
      id="name"
      v-model="name"
      :is-invalid="v$.name.$error"
      class="modal-favourites__form-group"
      is-required
      label="Название"
    />
    <AppSelect
      v-model="order"
      :options="$options.youtubeOrderOptions"
      class="modal-favourites__form-group"
    />
    <InputRange
      v-model="resultsCount"
      :max="$options.youtubeResultsRange.max"
      :min="$options.youtubeResultsRange.min"
      class="modal-favourites__form-group"
    />
    <AppError :errors="errors" />
    <div class="modal-favourites__buttons">
      <AppButton
        class="modal-favourites__button"
        size="large"
        style-type="outline"
        text="Не изменять"
        @click="cancel"
      />
      <AppButton
        class="modal-favourites__button"
        size="large"
        style-type="fill"
        text="Изменить"
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
    ...mapState('favourites', { favourites: 'favourites' }),
    ...mapState('user', { userId: 'id' }),
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
      this.errors = [];
      this.id = Favourites.getIndex('request', this.request, this.userId);
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
