<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favourites"
  >
    <form @submit.prevent="save">
      <h3>{{ $t('favourites.changeRequest') }}</h3>
      <AppInput
        id="request"
        v-model="request"
        :is-invalid="v$.request.$error"
        class="modal-favourites__form-group"
        is-required
        :label="$t('favourites.request')"
      />
      <AppInput
        id="name"
        v-model="name"
        :is-invalid="v$.name.$error"
        class="modal-favourites__form-group"
        is-required
        :label="$t('favourites.name')"
      />
      <AppSelect
        v-model="order"
        :options="$options.youtubeOrderOptions"
        class="modal-favourites__form-group"
      />
      <AppInputRange
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
          :text="$t('favourites.doNotChange')"
          @click="cancel"
        />
        <AppButton
          class="modal-favourites__button"
          size="large"
          style-type="fill"
          :text="$t('favourites.change')"
          type="submit"
        />
      </div>
    </form>
  </app-modal>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapState } from 'vuex';
import { generalErrors, youtubeOrderOptions, youtubeResultsRange } from '@/consts/globalParams';
import Favourites from '@/entities/Favourites';
import AppButton from '@/components/app/AppButton';
import AppError from '@/components/app/AppError';
import AppInput from '@/components/app/AppInput';
import AppModal from '@/components/app/AppModal';
import AppSelect from '@/components/app/AppSelect';
import AppInputRange from '@/components/app/AppInputRange';

export default {
  name: 'ModalEditFavourite',
  components: {
    AppInputRange,
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
      idx: '',
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
      favourites.splice(this.idx, 1);
      return favourites;
    },
    isNameUnique() {
      return Favourites.isNameUnique(this.favouritesExceptThisOne, this.name);
    },
    isRequestUnique() {
      return Favourites.isRequestUnique(this.favouritesExceptThisOne, this.request);
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
    async open(favourite, idx) {
      this.request = favourite.request;
      this.name = favourite.name;
      this.order = favourite.order;
      this.resultsCount = favourite.resultsCount;
      this.errors = [];
      this.idx = idx;
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
