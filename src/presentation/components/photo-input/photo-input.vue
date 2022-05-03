<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleInputChange" type="file" name="file" id="file" />
    <button @click="uploadPhoto">Add</button>
  </form>
</template>

<script>
import RemoteAddPhoto from "@/domain/usecases/remote-add-photo";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
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

      const axiosHttpClient = axiosHttpClientFactory();
      const url = apiUrlFactory("/photos");

      try {
        const remoteAddPhoto = new RemoteAddPhoto(url, axiosHttpClient);
        const response = await remoteAddPhoto.add(
          "627166cbc8ff02d4ca2ead74",
          this.file
        );
        toast.success(response.msg);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./photo-input-styles.scss";
</style>
