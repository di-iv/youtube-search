<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favorites"
  >
    <form @submit.prevent="save">
      <h3>Сохранить запрос</h3>
      <AppInput
        id="request"
        v-model="request"
        label="Запрос"
        class="modal-favorites__form-group"
        disabled
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
          text="Не сохранять"
          style-type="outline"
          size="large"
          class="modal-favorites__button"
          @click="cancel"
        />
        <AppButton
          text="Сохранить"
          size="large"
          style-type="fill"
          class="modal-favorites__button"
          type="submit"
        />
      </div>
    </form>
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
import { select } from '@/consts/globalParams';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapState } from 'vuex';

export default {
  name: 'ModalAddFavourite',
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
      v$: useVuelidate(),
      options: select.options,
      order: null,
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
    ...mapState('favourites', { favourites: 'favorites' }),
  },
  methods: {
    async save() {
      this.errors = [];
      const isFormValid = await this.v$.$validate();
      if (isFormValid) {
        const nameIsUniq = Favourites.checkUniq(this.favourites, 'name', this.name);
        if (!nameIsUniq) {
          this.errors.push('Такое имя уже существует');
          return;
        }
        this.$refs.modal.confirm();
      }
    },
    async open(request) {
      this.request = request;
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
