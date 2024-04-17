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
          <CustomLoader />
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
      this.loading = true;

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
          const user = {
            username: result.user.name,
            userId: result.user.userId,
            role: result.user.role
          };
          useUserStore().setUser(user);

          const redirectPath = this.$route.query.redirect || '/protected';
          this.$router.push(redirectPath);
        } else {
          const redirectPath = this.$route.query.redirect || '/failed';
          this.$router.push(redirectPath);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
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