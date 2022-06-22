<template>
  <div>
    <SignIn
      v-if="cardName === 'signIn'"
      @change="changeCard($event)"
    />
    <SignUp
      v-if="cardName === 'signUp'"
      @change="changeCard($event)"
    />
  </div>
</template>

<script>
import SignIn from '@/components/authorization/SignIn';
import SignUp from '@/components/authorization/SignUp';

export default {
  name: 'LoginView',
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      cardName: 'signIn',
    };
  },
  methods: {
    changeCard(name) {
      this.cardName = name;
    },
  },
};
</script>
