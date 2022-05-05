<template>
  <GalleryHeader />
  <div class="mainWrap">
    <GallerySpinner v-if="isLoading" />
    <PhotoInput />
    <CardPhoto :key="photo._id" v-for="photo in allPhotos" :photo="photo" />
    <button v-if="!isLoading" class="loadMore" @click="handleClick">
      Load more photos
    </button>
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
import TokenExpiredError from "@/domain/errors/token-expired-error";

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
    ...mapActions(["loadPhotos", "saveCurrentUser"]),
    async fetchPhotos() {
      const remoteLoadPhotos = remoteLoadPhotosFactory();

      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await remoteLoadPhotos.load(this.page, userId, token);

        this.isLoading = false;

        this.loadPhotos(response.photos);
        this.saveCurrentUser({
          userId: userId,
          isAdmin: response.is_admin,
        });
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          localStorage.clear();
          this.$router.push("/login");
        }
        const toast = useToast();
        toast.error(error.message);
      }
    },

    async handleClick() {
      this.page++;
      await this.fetchPhotos();
    },
  },
  computed: mapGetters(["allPhotos", "currentUser"]),

  async created() {
    this.fetchPhotos();
  },
};
</script>

<style lang="scss">
@import url("./home-page-styles.scss");

.loadMore {
  margin: 1rem 0 2rem;
  font-size: 1rem;

  &:hover {
    background: $primary;
    color: $white;
    cursor: pointer;
  }
}
</style>
