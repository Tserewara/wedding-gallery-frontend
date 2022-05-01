<template>
  <h1>Login</h1>
  <div class="errorWrap">
    <p>{{ errorMessage }}</p>
  </div>
  <form>
    <input v-model="email" type="email" placeholder="Enter your email" />
    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
    />
    <button @click="auth">Login</button>
  </form>
</template>

<script>
import remoteAuthenticationFactory from "@/main/factories/domain/usecases/remote-authentication-factory.js";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "peter@example.com",
      password: "aPassword",
      errorMessage: "",
    };
  },
  methods: {
    async auth(event) {
      event.preventDefault();
      const remoteAuthentication = remoteAuthenticationFactory();
      try {
        const response = await remoteAuthentication.auth(
          this.email,
          this.password
        );
        localStorage.setItem("token", response.token);
        localStorage.setItem("user_id", response.user_id);
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>
