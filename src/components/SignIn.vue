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
        <h3>Вход</h3>
        <form @submit.prevent="login">
          <AppInput
            id="login"
            v-model="email"
            label="Логин"
            label-color="border-color"
            class="login__form-group"
          />
          <InputPassword
            v-model="password"
            class="login__form-group"
          />
          <AppError :errors="errors" />
          <div class="login__buttons">
            <AppButton
              text="Войти"
              size="medium"
              type="submit"
              style-type="fill"
              class="login__button"
            />
            <AppButton
              text="Зарегистрироваться"
              style-type="link"
              class="login__button login__button--link"
              @click="$emit('change', 'signUp')"
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
import { globalParams } from '@/utilities/params';

export default {
  name: 'AppLogin',
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
        await this.$store.dispatch('auth/login', {
          email: this.email, password: this.password,
        });
        await this.$router.push('/search');
      } catch (e) {
        const errorMessage = e.response.data.error.message;
        this.errors.push(globalParams.authErrors[errorMessage]);
      }
    },
  },
};
</script>
