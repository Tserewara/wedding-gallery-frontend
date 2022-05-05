<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleChange" type="file" name="file" id="file" />
    <button @click="handleClick">Add</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import remoteAddPhotoFactory from "@/main/factories/domain/usecases/remote-add-photo-factory";
import TokenExpiredError from "@/domain/errors/token-expired-error";

export default {
  name: "PhotoInput",
  data() {
    return {
      file: null,
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["addPhoto"]),
    handleChange(event) {
      this.file = event.target.files[0];
    },
    async handleClick(event) {
      event.preventDefault();
      const toast = useToast();
      const remoteAddPhoto = remoteAddPhotoFactory();
      const token = localStorage.getItem("token");

      try {
        const response = await remoteAddPhoto.add(
          this.currentUser.userId,
          this.file,
          token
        );
        if (this.currentUser.isAdmin) {
          this.addPhoto(response);
        }
        toast.success("photo added successfully");
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          localStorage.clear();
          this.$router.push("/login");
        }
        toast.error(`${error.message}: photo`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./photo-input-styles.scss";
</style>
