<template>
  <div class="container">
    <ModalCard>
      <div class="login">
        <AppIcon icon-name="IconLogo" width="88" height="88" class="login__icon"/>
        <h3>Вход</h3>
        <form action="">
          <FormGroup label="Логин" id="login" class="login__form-group"/>
          <FormGroup
            id="password"
            icon-name="IconEyeOff"
            label="Пароль"
            type="password"
            class="login__form-group"
          />
          <div>
            <router-link to="/search">
              <AppButton text="Войти" size="medium"/>
            </router-link>
          </div>
        </form>
      </div>
    </ModalCard>
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

};
</script>
