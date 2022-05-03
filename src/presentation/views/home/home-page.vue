<template>
  <GalleryHeader />
  <div class="mainWrap">
    <PhotoInput />
    <CardPhoto :key="index" v-for="(photo, index) in photos" :photo="photo" />
  </div>
</template>

<script>
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";
import PhotoInput from "@/presentation/components/photo-input/photo-input.vue";
import CardPhoto from "@/presentation/components/card-photo/card-photo.vue";
import RemoteLoadPhotos from "../../../domain/usecases/remote-load-photos";
import apiUrlFactory from "../../../main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "../../../main/factories/infra/axios-http-client-factory";

export default {
  components: { GalleryHeader, PhotoInput, CardPhoto },
  name: "GalleryHome",
  data() {
    return {
      photos: [],
    };
  },
  async created() {
    const url = apiUrlFactory("/photos?page=1");
    const axiosHttpClient = axiosHttpClientFactory();
    const remoteLoadPhotos = new RemoteLoadPhotos(url, axiosHttpClient);
    const response = await remoteLoadPhotos.load();
    this.photos = response;
  },
};
</script>

<style lang="scss">
@import url("./home-page-styles.scss");
</style>
