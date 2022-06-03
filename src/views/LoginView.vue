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
        <form action="">
          <AppInput
            id="login"
            v-model="email"
            label="Логин"
            class="login__form-group"
          />
          <InputPassword
            v-model="password"
            class="login__form-group"
          />
          <div>
            <router-link to="/search">
              <AppButton
                text="Войти"
                size="medium"
              />
            </router-link>
          </div>
        </form>
      </div>
    </app-card>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';
import AppInput from '@/components/AppInput';
import AppCard from '@/components/AppCard';
import InputPassword from '@/components/InputPassword';

export default {
  name: 'LoginView',
  components: {
    InputPassword,
    AppIcon,
    AppButton,
    AppInput,
    AppCard,
  },
  data() {
    return {
      iconName: 'EyeOff',
      type: 'password',
      email: '',
      password: '',
    };
  },
};
</script>
