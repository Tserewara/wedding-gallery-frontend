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
import remoteLoadPhotosFactory from "@/main/factories/domain/usecases/remote-load-photos-factory";

export default {
  components: { GalleryHeader, PhotoInput, CardPhoto },
  name: "GalleryHome",
  data() {
    return {
      photos: [],
      page: 1,
    };
  },
  async created() {
    const remoteLoadPhotos = remoteLoadPhotosFactory();
    const response = await remoteLoadPhotos.load(this.page);
    this.photos = response;
  },
};
</script>

<style lang="scss">
@import url("./home-page-styles.scss");
</style>
