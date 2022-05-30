<template>
  <div class="container">
    <modal-card>
      <div class="login">
        <AppIcon
          icon-name="IconLogo"
          width="88"
          height="88"
          class="login__icon"
        />
        <h3>Вход</h3>
        <form action="">
          <FormGroup
            id="login"
            label="Логин"
            class="login__form-group"
          />
          <FormGroup
            id="password"
            :icon-name="iconName"
            label="Пароль"
            :type="type"
            class="login__form-group"
            @icon-cliked="toggleVisibility"
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
    </modal-card>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';
import FormGroup from '@/components/FormGroup';
import ModalCard from '@/components/ModalCard';

export default {
  name: 'LoginView',
  components: {
    AppIcon,
    AppButton,
    FormGroup,
    ModalCard,
  },
  data() {
    return {
      iconName: 'IconEyeOff',
      type: 'password',
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
