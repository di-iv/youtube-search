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
          <AppInputPassword
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
          <AppLocaleChanger />
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
import AppButton from '@/components/app/AppButton';
import AppError from '@/components/app/AppError';
import AppIcon from '@/components/app/AppIcon';
import AppInput from '@/components/app/AppInput';
import AppCard from '@/components/app/AppCard';
import AppInputPassword from '@/components/app/AppInputPassword';
import AppLocaleChanger from '@/components/app/AppLocaleChanger';

export default {
  name: 'SignUp',
  components: {
    AppLocaleChanger,
    AppError,
    AppInputPassword,
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
