<template>
  <GalleryHeader />
  <div class="signupWrap">
    <h1>Sign Up</h1>

    <form class="formWrap">
      <input
        v-model="name"
        type="text"
        placeholder="Enter your name"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Repeat your password"
        required
      />
      <div class="roleWrap">
        <div class="role">
          <input v-model="picked" type="radio" value="admin" />
          <label>I'm the bride/groom</label>
        </div>
        <div class="role">
          <input v-model="picked" type="radio" value="friend" checked />
          <label>I'm a friend</label>
        </div>
      </div>
      <button @click="handleSubmit">Sign Up</button>
    </form>
    <div v-if="errorMessage" class="errorWrap">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-if="successMessage" class="successMessage">
      <p>{{ successMessage }}</p>
      <RouterLink to="/login">Go to login page</RouterLink>
    </div>
  </div>
</template>

<script>
import remoteCreateUserFactory from "@/main/factories/domain/usecases/remote-create-user-factory";
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";

export default {
  name: "SignUpPage",
  components: { GalleryHeader },

  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      picked: false,
      errorMessage: null,
      successMessage: null,
    };
  },

  computed: {
    isAdmin() {
      return this.picked === "admin" ? true : false;
    },
  },
  methods: {
    resetForm() {
      this.errorMessage = null;
      this.name = null;
      this.email = null;
      this.password = null;
      this.passwordConfirmation = null;
      this.picked = false;
    },

    isValidEmail() {
      const emailRegex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return emailRegex.test(this.email);
    },

    async handleSubmit(event) {
      event.preventDefault();

      this.successMessage = null;

      if (this.password !== this.passwordConfirmation) {
        this.errorMessage = "Passwords don't match!";
        return;
      }

      if (!this.isValidEmail()) {
        this.errorMessage = "email is invalid";
        return;
      }

      const remoteCreateUser = remoteCreateUserFactory();

      try {
        const response = await remoteCreateUser.create(
          this.name,
          this.email,
          this.password,
          this.isAdmin
        );
        this.successMessage = response.msg;
        this.resetForm();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style lang="scss">
@import "./signup-page-styles.scss";
</style>
