<template>
  <header class="headerWrap">
    <h1>Wedding Gallery</h1>
    <span v-if="isLoggedIn" @click="handleClick">logout</span>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GalleryHeader",
  methods: {
    handleClick() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isLoggedIn() {
      return this.currentUser.userId;
    },
  },
};
</script>

<style lang="scss">
@import "./gallery-header-styles.scss";
</style>
