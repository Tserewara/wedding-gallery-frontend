<template>
  <GalleryHeader />
  <div class="mainWrap">
    <GallerySpinner v-if="isLoading" />
    <PhotoInput />
    <CardPhoto :key="index" v-for="(photo, index) in photos" :photo="photo" />
  </div>
</template>

<script>
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";
import PhotoInput from "@/presentation/components/photo-input/photo-input.vue";
import CardPhoto from "@/presentation/components/card-photo/card-photo.vue";
import GallerySpinner from "@/presentation/components/gallery-spinner/gallery-spinner.vue";
import remoteLoadPhotosFactory from "@/main/factories/domain/usecases/remote-load-photos-factory";
import { useToast } from "vue-toastification";

export default {
  components: { GalleryHeader, PhotoInput, CardPhoto, GallerySpinner },
  name: "GalleryHome",
  data() {
    return {
      isLoading: true,
      photos: [],
      page: 1,
    };
  },
  async created() {
    const remoteLoadPhotos = remoteLoadPhotosFactory();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await remoteLoadPhotos.load(this.page, userId, token);
      this.photos = response;
      this.isLoading = false;
    } catch (error) {
      const toast = useToast();
      toast.error(error.message);
    }
  },
};
</script>

<style lang="scss">
@import url("./home-page-styles.scss");
</style>
