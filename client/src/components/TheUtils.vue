<template>
  <div class="utils">
    <p v-if="isLoggedIn">Hello {{ userStore.name }}</p>
    <AppLink v-if="!isLoggedIn" to="/register">Register</AppLink>
    <AppLink v-if="!isLoggedIn" to="/login">Login</AppLink>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserNameStore';

export default {
  data() {
    return {
      userStore: useUserStore()
    };
  },
  computed: {
    isLoggedIn() {
      return this.userStore.name !== '';
    }
  },
  methods: {
    logout() {
      this.userStore.clearName(); // Clear the user's name in Pinia store
      //! You can also add any additional logout logic here, such as clearing cookies
    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || '';

    const checkCookiesAndName = () => {
      if ((!document.cookie.includes('refreshToken') || !document.cookie.includes('accessToken')) && this.username !== '') {
        this.userStore.clearName();
        localStorage.removeItem('username');
        this.username = '';
      }
    };

    // Check cookies and user's name on component mount and when cookies change
    checkCookiesAndName();

    this.$watch(
      () => document.cookie,
      checkCookiesAndName
    );
  }
};
</script>

<style lang="scss" scoped>
.utils {
  width: 100%;
  height: 40px;
  background: #011627;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  * {
    font-size: 16px;
    color: white;
    width: fit-content;
    padding: 10px;
  }
  a {}
}
</style>