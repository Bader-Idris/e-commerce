<template>
  <div class="utils">
    <p v-if="isLoggedIn">Hello {{ userStore.user.username }}</p>
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
      const user = JSON.parse(localStorage.getItem('user')) || {};
      user && typeof user === 'object' ? user.username !== '' : false;
      //! instead of user.name and userStore.user
      // return this.userStore.name !== '';
    }
  },
  methods: {
    async logout() {
      const url = '/api/v1/auth/logout';
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Cookie', `accessToken=${this.accessToken}; refreshToken=${this.refreshToken}`);

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({ userId: this.userId }),
        redirect: 'follow'
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        // Clear user data after successful logout
        this.clearUserData();
        this.userStore.clearUser();
      } catch (error) {
        console.error(error);
      }
    },
    clearUserData() {
      localStorage.removeItem('user');
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};

    this.$watch(
      () => document.cookie,
      () => {
        if (!document.cookie.includes('refreshToken') || !document.cookie.includes('accessToken')) {
          this.user = {};
          localStorage.removeItem('user');
        }
      }
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