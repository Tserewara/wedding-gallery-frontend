<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleInputChange" type="file" name="file" id="file" />
    <button @click="uploadPhoto">Add</button>
  </form>
</template>

<script>
import RemoteAddPhoto from "../../../domain/usecases/remote-add-photo";
import apiUrlFactory from "../../../main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "../../../main/factories/infra/axios-http-client-factory";

export default {
  name: "PhotoInput",
  data() {
    return {
      file: "",
    };
  },
  methods: {
    handleInputChange(event) {
      this.file = event.target.files[0];
    },
    async uploadPhoto(event) {
      event.preventDefault();
      const axiosHttpClient = axiosHttpClientFactory();

      const url = apiUrlFactory("/photos");

      const remoteAddPhoto = new RemoteAddPhoto(url, axiosHttpClient);

      await remoteAddPhoto.add("", this.file);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./photo-input-styles.scss";
</style>
