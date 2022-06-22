<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favourites"
  >
    <form @submit.prevent="save">
      <h3>{{ $t('favourites.saveRequest') }}</h3>
      <AppInput
        id="request"
        v-model="request"
        class="modal-favourites__form-group"
        is-disabled
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
          :text="$t('favourites.doNotSave')"
          @click="cancel"
        />
        <AppButton
          class="modal-favourites__button"
          size="large"
          style-type="fill"
          :text="$t('favourites.save')"
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
import {
  generalErrors, youtubeOrderOptions, youtubeResultsRange, defaultYoutubeOrder,
} from '@/consts/globalParams';
import Favourites from '@/entities/Favourites';
import AppButton from '@/components/AppButton';
import AppError from '@/components/AppError';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';
import AppSelect from '@/components/AppSelect';
import AppInputRange from '@/components/AppInputRange';

export default {
  name: 'ModalAddFavourite',
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
  defaultYoutubeOrder,
  data() {
    return {
      request: '',
      name: '',
      errors: [],
      v$: useVuelidate(),
      order: this.$options.defaultYoutubeOrder,
      resultsCount: 12,
    };
  },
  validations() {
    return {
      name: {
        required,
      },
    };
  },
  computed: {
    ...mapState('favourites', { favourites: 'favourites' }),
  },
  methods: {
    async save() {
      this.errors = [];
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) {
        return;
      }
      const isNameNotUnique = !Favourites.isNameUnique(this.favourites, this.name);
      if (isNameNotUnique) {
        this.errors.push(generalErrors.nameExist);
        return;
      }
      this.$refs.modal.confirm();
    },
    async open(request) {
      this.request = request;
      const isModalSubmitted = await this.$refs.modal.open();
      if (isModalSubmitted) {
        return {
          isSuccess: true,
          newFavourite: {
            request: this.request,
            name: this.name,
            order: this.order,
            resultsCount: this.resultsCount,
          },
        };
      }
      return {
        isSuccess: false,
        newFavourite: null,
      };
    },
  },
};
</script>
