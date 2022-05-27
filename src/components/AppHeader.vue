<template>
  <header class="header">
    <div class="header__wrapper container">
      <AppIcon class="header__logo" iconName="IconLogo"></AppIcon>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <router-link
              class="header__nav-link"
              active-class="header__nav-link--active"
              to="/"
            >
              Поиск
            </router-link>
          </li>
          <li class="header__nav-item">
            <router-link
              class="header__nav-link"
              active-class="header__nav-link--active"
              to="/favorites"
            >
              Избранное
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="header__logout">
        <router-link class="header__logout-link" to="/">Выйти</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import AppIcon from '@/components/AppIcon';

export default {
  name: 'AppHeader',
  components: { AppIcon },
};
</script>

<style scoped>

</style>
