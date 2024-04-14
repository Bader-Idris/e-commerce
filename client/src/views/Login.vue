<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="email">email</label>
      <input v-model="email" name="email" type="text" class="input">
      <label for="password">Password</label>
      <input v-model="password" name="password" type="text" class="input">
      <button class="btn" :disabled="loading">
        <span v-if="loading">
          <CustomLoader /> <!-- Show the loader when loading is true -->
        </span>
        <span v-else>
          Login
        </span>
      </button>
    </form>
  </div>
</template>
<script>
import CustomLoader from "@/components/CustomLoader.vue";
import { useUserStore } from '@/stores/UserNameStore';

export default {
  data(){
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true; // Set loading to true when login starts

      const url = '/api/v1/auth/login';
      const data = {
        email: this.email,
        password: this.password
      };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow"
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if (response.ok) {
          // Set cookies in document.cookie
          // document.cookie = `accessToken=${result.accessToken}; path=/`;
          // document.cookie = `refreshToken=${result.refreshToken}; path=/`;

          // // Retrieve cookies from document.cookie
          // const cookies = document.cookie.split(';');
          // let accessToken = '';
          // let refreshToken = '';

          // cookies.forEach(cookie => {
          //   const [name, value] = cookie.trim().split('=');
          //   if (name === 'accessToken') {
          //     accessToken = value;
          //   } else if (name === 'refreshToken') {
          //     refreshToken = value;
          //   }
          // });

          this.user = {
            username: result.user.name,
            userId: result.user.userId,
            // accessToken: accessToken,
            // refreshToken: refreshToken
          };
          // localStorage.setItem('user', JSON.stringify(this.user));
          useUserStore().setUser(this.user);
          // useUserStore().setUser({ username: result.user.name });

          const redirectPath = this.$route.query.redirect || '/protected';
          // this.$router.push(redirectPath);
          this.$router.push(redirectPath).catch(() => {
            // Handle navigation errors, e.g., invalid route
            this.$router.push('/protected');
          });
        } else {
          const redirectPath = this.$route.query.redirect || '/failed';
          this.$router.push(redirectPath);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Set loading back to false after login completes
      }
    }
  },
  components: {
    CustomLoader
  }
}
</script>

<style lang="scss">
.login {
  // width: 384px;
  // height: 520px;
  // position: relative;
  // display: flex;
  // justify-content: center;
  // margin: auto;
  @include inTheMiddle;
  .form {
    width: 384px;
    height: 520px;
    position: relative;
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    @include softForm;
    h1 {
      text-align: center;
    }

    .input {
      border: 1px solid gray;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
    }

    .btn {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }
}
</style>