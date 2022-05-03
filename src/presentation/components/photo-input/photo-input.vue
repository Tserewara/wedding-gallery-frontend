<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleInputChange" type="file" name="file" id="file" />
    <button @click="uploadPhoto">Add</button>
  </form>
</template>

<script>
import remoteAddPhotoFactory from "@/main/factories/domain/usecases/remote-add-photo-factory";
import { useToast } from "vue-toastification";

export default {
  name: "PhotoInput",
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleInputChange(event) {
      this.file = event.target.files[0];
    },
    async uploadPhoto(event) {
      event.preventDefault();
      const toast = useToast();
      const remoteAddPhoto = remoteAddPhotoFactory();
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await remoteAddPhoto.add(userId, this.file, token);
        toast.success(response.msg);
      } catch (error) {
        toast.error(`Photo missing: ${error.message}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./photo-input-styles.scss";
</style>
