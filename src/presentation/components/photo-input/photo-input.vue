<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleChange" type="file" name="file" id="file" />
    <button @click="handleClick">Add</button>
  </form>
  <div v-if="uploading" class="uploading">
    <GallerySpinner />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import remoteAddPhotoFactory from "@/main/factories/domain/usecases/remote-add-photo-factory";
import TokenExpiredError from "@/domain/errors/token-expired-error";
import GallerySpinner from "@/presentation/components/gallery-spinner/gallery-spinner.vue";

export default {
  name: "PhotoInput",
  data() {
    return {
      file: null,
      uploading: false,
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["addPhoto"]),
    handleChange(event) {
      const toast = useToast();
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      this.file = event.target.files[0];

      const fileType = this.file.type;
      const fileSize = this.file.size;
      const maxSize = 30 * 1024 * 1024;

      if (fileSize > maxSize) {
        toast.error(`This photo is too big. Max size: 30MB`);
        return;
      }

      if (!allowedTypes.includes(fileType)) {
        toast.error(`File type not allowed ${fileType}`);
        return;
      }
    },
    async handleClick(event) {
      event.preventDefault();
      const toast = useToast();
      const remoteAddPhoto = remoteAddPhotoFactory();
      const token = localStorage.getItem("token");
      try {
        this.uploading = true;
        const response = await remoteAddPhoto.add(
          this.currentUser.userId,
          this.file,
          token
        );
        if (this.currentUser.isAdmin) {
          this.addPhoto(response);
        }
        this.uploading = false;
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
  components: { GallerySpinner },
};
</script>

<style scoped lang="scss">
@import "./photo-input-styles.scss";
</style>
