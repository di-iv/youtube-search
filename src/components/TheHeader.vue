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
              :to="nav.link"
              active-class="header__nav-link--active"
              class="header__nav-link"
            >
              {{ $t(nav.title) }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="header__right-side">
        <TheLocaleChanger class="header__locale-changer" />
        <router-link
          class="header__logout-link"
          to="/"
          @click="logout"
        >
          {{ $t('nav.logout') }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import TheLocaleChanger from '@/components/TheLocaleChanger';
import { mapMutations } from 'vuex';
import { navs } from '@/consts/globalParams';
import AppIcon from '@/components/app/AppIcon';

export default {
  name: 'AppHeader',
  components: {
    AppIcon,
    TheLocaleChanger,
  },
  data() {
    return {
      navs,
    };
  },
  methods: {
    ...mapMutations('user', ['logout']),
  },
};
</script>
