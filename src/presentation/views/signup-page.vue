<template>
  <h1>Sign Up</h1>
  <div class="errorWrap">
    <p>{{ errorMessage }}</p>
  </div>
  <form>
    <input v-model="name" type="text" placeholder="Enter your name" /><br />
    <input v-model="email" type="email" placeholder="Enter your email" /><br />
    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
    /><br />
    <input
      v-model="confirmationPassword"
      type="password"
      placeholder="Repeat your password"
    /><br />

    <input v-model="picked" type="radio" value="admin" />
    <label>I'm the bride/groom</label><br />
    <input v-model="picked" type="radio" value="friend" />
    <label>I'm a friend</label><br />
    <button @click="signUp">Sign Up</button>
  </form>
</template>

<script>
import remoteCreateUserFactory from "@/main/factories/domain/usecases/remote-create-user-factory";

export default {
  name: "SignUpPage",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmationPassword: null,
      picked: false,
      errorMessage: null,
    };
  },
  computed: {
    isAdmin() {
      return this.picked === "admin" ? true : false;
    },
  },
  methods: {
    async signUp(event) {
      event.preventDefault();

      const remoteCreateUser = remoteCreateUserFactory();

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
