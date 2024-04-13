<template>
  <div class="verify" v-if="verified">
    <p>your email's been verified</p>
    <p><span>{{ seconds < 10 ? '0' + seconds : seconds }}</span> seconds to go to the main page</p>
  </div>
  <div v-else class="warn">
    please check your email again
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      seconds: 10,
      verified: false,
    };
  },
  mounted() {
    this.remaining();
    this.verifyEmail();
  },
  methods: {
    remaining() {
      const intervalId = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    },
    async verifyEmail() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": this.$route.query.email,
        "verificationToken": this.$route.query.token
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        const response = await fetch("/api/v1/auth/verify-email", requestOptions);
        if (response.status === 200) {
          const result = await response.json();
          console.log(result); // You can handle the result as needed
          this.verified = true; // Update the verified status based on the result
        } else if (response.status === 401) {
          const errorData = await response.json();
          // Display toast notification with the error message
          toast(errorData.msg, {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true
          });
          this.verified = false; // Update the verified status based on the error
        }
      } catch (error) {
        console.error(error);
        this.verified = false; // Update the verified status based on the error
      }
    }
  }
};
</script>

<style lang="scss">
.warn,
.verify {
  margin: auto 50px;
  background-color: #007acc;
  color: white;
  width: 50%;
  padding: 30px;
  transform: translate(50%, 50%);
  position: relative;
  left: 0;
  top: 0;
  border-radius: 4px;
}
</style>