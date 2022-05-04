<template>
  <GalleryHeader />
  <div class="mainWrap">
    <GallerySpinner v-if="isLoading" />
    <PhotoInput />
    <CardPhoto :key="photo._id" v-for="photo in allPhotos" :photo="photo" />
  </div>
</template>

<script>
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";
import PhotoInput from "@/presentation/components/photo-input/photo-input.vue";
import CardPhoto from "@/presentation/components/card-photo/card-photo.vue";
import GallerySpinner from "@/presentation/components/gallery-spinner/gallery-spinner.vue";
import remoteLoadPhotosFactory from "@/main/factories/domain/usecases/remote-load-photos-factory";
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { GalleryHeader, PhotoInput, CardPhoto, GallerySpinner },
  name: "GalleryHome",
  data() {
    return {
      isLoading: true,
      page: 1,
    };
  },
  methods: {
    ...mapActions(["loadPhotos"]),
  },
  computed: mapGetters(["allPhotos"]),

  async created() {
    const remoteLoadPhotos = remoteLoadPhotosFactory();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await remoteLoadPhotos.load(this.page, userId, token);
      this.isLoading = false;
      this.loadPhotos(response);
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
