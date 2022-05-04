<template>
  <form class="formWrap">
    <label for="file">Choose a photo</label>
    <input @change="handleChange" type="file" name="file" id="file" />
    <button @click="handleClick">Add</button>
  </form>
</template>

<script>
import remoteAddPhotoFactory from "@/main/factories/domain/usecases/remote-add-photo-factory";
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PhotoInput",
  data() {
    return {
      file: null,
    };
  },
  computed: mapGetters(["isAdmin"]),
  methods: {
    ...mapActions(["addPhoto"]),
    handleChange(event) {
      this.file = event.target.files[0];
    },
    async handleClick(event) {
      event.preventDefault();
      const toast = useToast();
      const remoteAddPhoto = remoteAddPhotoFactory();
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await remoteAddPhoto.add(userId, this.file, token);
        if (this.isAdmin) {
          this.addPhoto(response);
        }
        toast.success("photo added successfully");
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
