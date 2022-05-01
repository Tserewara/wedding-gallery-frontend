<template>
  <h1>Login</h1>
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
import { RemoteAuthentication } from "@/data/usecases/remote-authentication.js";
import { AxiosHttpClient } from "@/infra/axios-http-client.js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "peter@example.com",
      password: "aPassword",
    };
  },
  methods: {
    async auth(event) {
      event.preventDefault();
      const axiosHttpClient = new AxiosHttpClient();

      const remoteAuthentication = new RemoteAuthentication(
        "http://localhost:5000/login",
        axiosHttpClient
      );

      const response = await remoteAuthentication.auth(
        this.email,
        this.password
      );

      console.log(response);
    },
  },
};
</script>
