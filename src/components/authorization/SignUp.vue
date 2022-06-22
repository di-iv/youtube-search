<template>
  <div class="login container">
    <app-card>
      <div class="login__card">
        <AppIcon
          :height="88"
          :width="88"
          class="login__icon"
          icon-name="Logo"
        />
        <h3>{{ $t('auth.registrationForm') }}</h3>
        <form @submit.prevent="trySignUp">
          <AppInput
            id="login"
            v-model="email"
            :is-invalid="v$.email.$error"
            class="login__form-group"
            label="Email"
            label-color="text-grey"
          />
          <InputPassword
            v-model="password"
            :is-invalid="v$.password.$error"
            class="login__form-group"
          />
          <AppError :errors="errors" />
          <div class="login__buttons">
            <AppButton
              class="login__button"
              size="medium"
              style-type="fill"
              :text="$t('auth.createAccount')"
              type="submit"
            />
            <AppButton
              class="login__button login__button--link"
              style-type="link"
              :text="$t('auth.signIn')"
              @click="onClick"
            />
          </div>
          <TheLocaleChanger />
        </form>
      </div>
    </app-card>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import { authErrors } from '@/consts/globalParams';
import AppButton from '@/components/AppButton';
import AppError from '@/components/AppError';
import AppIcon from '@/components/AppIcon';
import AppInput from '@/components/AppInput';
import AppCard from '@/components/AppCard';
import InputPassword from '@/components/InputPassword';
import TheLocaleChanger from '@/components/TheLocaleChanger';

export default {
  name: 'SignUp',
  components: {
    TheLocaleChanger,
    AppError,
    InputPassword,
    AppIcon,
    AppButton,
    AppInput,
    AppCard,
  },
  emits: ['change'],
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  methods: {
    ...mapActions('user', ['signUp']),
    async trySignUp() {
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) {
        return;
      }
      try {
        await this.signUp({
          email: this.email,
          password: this.password,
        });
        await this.$router.push({ name: 'search' });
      } catch (error) {
        const errorMessage = error.response.data.error.message;
        this.errors = [authErrors[errorMessage]];
      }
    },
    onClick() {
      this.$emit('change', 'signIn');
    },
  },
};
</script>
