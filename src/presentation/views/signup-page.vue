<template>
  <h1>Sign Up</h1>
  <div class="errorWrap">
    <p>{{ errorMessage }}</p>
  </div>
  <form>
    <input v-model="name" type="text" placeholder="Enter your name" />
    <input v-model="email" type="email" placeholder="Enter your email" />
    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
    /><input
      v-model="confirmationPassword"
      type="password"
      placeholder="Repeat your password"
    />
    <button @click="signUp">Sign Up</button>
  </form>
</template>

<script>
import RemoteCreateUser from "@/domain/usecases/remote-create-user.js";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";

export default {
  name: "SignUpPage",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmationPassword: null,
      isAdmin: false,
      errorMessage: null,
    };
  },
  methods: {
    async signUp(event) {
      event.preventDefault();

      const remoteCreateUser = new RemoteCreateUser(
        apiUrlFactory("/register"),
        axiosHttpClientFactory()
      );
      try {
        await remoteCreateUser.create(
          this.name,
          this.email,
          this.password,
          this.isAdmin
        );
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>
