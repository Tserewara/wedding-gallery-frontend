<template>
  <GalleryHeader />
  <div class="loginWrap">
    <h1>Login</h1>
    <form class="formWrap">
      <input v-model="email" type="email" placeholder="Enter your email" />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
      />
      <button @click="auth">Login</button>
      <div class="register">
        <RouterLink to="/signup">register</RouterLink>
      </div>
    </form>
    <div class="errorWrap">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import remoteAuthenticationFactory from "@/main/factories/domain/usecases/remote-authentication-factory.js";
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";
export default {
  name: "LoginPage",
  components: {
    GalleryHeader,
  },
  data() {
    return {
      email: "",
      password: "",
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
        localStorage.setItem("userId", response.user_id);
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style lang="scss">
@import "./login-page-styles.scss";
</style>
