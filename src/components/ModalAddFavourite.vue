<template>
  <app-modal
    ref="modal"
    v-slot="{cancel}"
    class="modal-favorites"
  >
    <form @submit.prevent>
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
          @click="save"
        />
      </div>
    </form>
  </app-modal>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppModal from '@/components/AppModal';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'ModalAddFavourite',
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
    async open(request) {
      this.request = request;
      const res = await this.$refs.modal.open();
      if (res) {
        return { request: this.request, name: this.name };
      }
      return res;
    },
  },
};
</script>
