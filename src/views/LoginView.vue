<template>
  <div class="login container">
    <app-card>
      <div class="login__card">
        <AppIcon
          icon-name="IconLogo"
          :width="88"
          :height="88"
          class="login__icon"
        />
        <h3>Вход</h3>
        <form action="">
          <FormGroup
            id="login"
            v-model="email"
            label="Логин"
            class="login__form-group"
          />
          <FormGroup
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
import FormGroup from '@/components/FormGroup';
import AppCard from '@/components/AppCard';

export default {
  name: 'LoginView',
  components: {
    AppIcon,
    AppButton,
    FormGroup,
    AppCard,
  },
  data() {
    return {
      iconName: 'IconEyeOff',
      type: 'password',
      email: '',
      password: '',
    };
  },
  methods: {
    toggleVisibility() {
      if (this.type === 'password') {
        this.iconName = 'IconEye';
        this.type = 'text';
      } else {
        this.iconName = 'IconEyeOff';
        this.type = 'password';
      }
    },
  },
};
</script>
