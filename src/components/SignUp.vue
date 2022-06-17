<template>
  <div class="login container">
    <app-card>
      <div class="login__card">
        <AppIcon
          icon-name="Logo"
          :width="88"
          :height="88"
          class="login__icon"
        />
        <h3>Регистрация</h3>
        <form @submit.prevent="login">
          <AppInput
            id="login"
            v-model="email"
            label="Логин"
            label-color="text-grey"
            class="login__form-group"
          />
          <InputPassword
            v-model="password"
            class="login__form-group"
          />
          <AppError :errors="errors" />
          <div class="login__buttons">
            <AppButton
              text="Создать"
              size="medium"
              type="submit"
              style-type="fill"
              class="login__button"
            />
            <AppButton
              text="Войти"
              style-type="link"
              class="login__button login__button--link"
              @click="$emit('change', 'signIn')"
            />
          </div>
        </form>
      </div>
    </app-card>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppError from '@/components/AppError';
import AppIcon from '@/components/AppIcon';
import AppInput from '@/components/AppInput';
import AppCard from '@/components/AppCard';
import InputPassword from '@/components/InputPassword';
import { authErrors } from '@/consts/globalParams';

export default {
  name: 'SignUp',
  components: {
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
      iconName: 'EyeOff',
      type: 'password',
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    async login() {
      this.errors = [];
      try {
        await this.$store.dispatch('auth/signUp', {
          email: this.email, password: this.password,
        });
        await this.$router.push('/search');
      } catch (e) {
        const errorMessage = e.response.data.error.message;
        this.errors.push(authErrors[errorMessage]);
      }
    },
  },
};
</script>
