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
          <AppInput
            id="password"
            v-model="password"
            :icon-name="iconName"
            label="Пароль"
            :type="type"
            class="login__form-group"
            @icon-clicked="toggleVisibility"
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

export default {
  name: 'LoginView',
  components: {
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
  methods: {
    toggleVisibility() {
      if (this.type === 'password') {
        this.iconName = 'Eye';
        this.type = 'text';
      } else {
        this.iconName = 'EyeOff';
        this.type = 'password';
      }
    },
  },
};
</script>
