<template>
  <GalleryHeader />
  <div class="signupWrap">
    <h1>Sign Up</h1>

    <form class="formWrap">
      <input v-model="name" type="text" placeholder="Enter your name" />
      <input v-model="email" type="email" placeholder="Enter your email" />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
      />
      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Repeat your password"
      />
      <div class="roleWrap">
        <div class="role">
          <input v-model="picked" type="radio" value="admin" />
          <label>I'm the bride/groom</label>
        </div>
        <div class="role">
          <input v-model="picked" type="radio" value="friend" />
          <label>I'm a friend</label>
        </div>
      </div>
      <button @click="signUp">Sign Up</button>
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

    async signUp(event) {
      event.preventDefault();

      this.successMessage = null;

      if (this.password !== this.passwordConfirmation) {
        this.errorMessage = "Passwords don't match!";
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
