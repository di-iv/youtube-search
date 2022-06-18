<template>
  <header class="header">
    <div class="header__wrapper container">
      <AppIcon
        class="header__logo"
        icon-name="Logo"
      />
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li
            v-for="nav in navs"
            :key="nav"
            class="header__nav-item"
          >
            <router-link
              class="header__nav-link"
              active-class="header__nav-link--active"
              :to="nav.link"
            >
              {{ nav.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="header__logout">
        <router-link
          class="header__logout-link"
          to="/"
          @click="tryLogout"
        >
          Выйти
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';
import { navs } from '@/consts/globalParams';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'AppHeader',
  components: { AppIcon },
  data() {
    return {
      navs,
    };
  },
  methods: {
    ...mapMutations('auth', ['logout']),

    tryLogout() {
      this.logout();
    },
  },
};
</script>
