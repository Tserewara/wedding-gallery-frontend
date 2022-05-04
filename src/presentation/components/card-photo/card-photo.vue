<template>
  <div class="cardPhotoWrap">
    <h3>uploaded by {{ photo.username }}</h3>
    <img :src="formatImageAddress(photo.image_address)" />
    <div class="likeWrap">
      <i class="fa-solid fa-heart"></i>
      <button v-if="isAdmin && !photo.is_approved" @click="handleClick">
        Approve Photo
      </button>
    </div>
    <CommentsContainer :comments="photo.comments" :photoId="photo._id" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import CommentsContainer from "@/presentation/components/comments-container/comments-container.vue";
import remoteApprovePhotoFactory from "@/main/factories/domain/usecases/remote-approve-photo-factory";

export default {
  name: "CardPhoto",
  components: { CommentsContainer },
  props: {
    photo: Object,
  },
  methods: {
    ...mapActions(["approvePhoto"]),
    formatImageAddress(address) {
      return `https://friends-gallery.s3.sa-east-1.amazonaws.com/${address}`;
    },
    async handleClick() {
      const toast = useToast();
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const remoteApprovePhoto = remoteApprovePhotoFactory();
      try {
        const response = await remoteApprovePhoto.approve(
          userId,
          this.photo._id,
          token
        );
        toast.success(response.msg);
        this.approvePhoto(this.photo);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },

  computed: mapGetters(["isAdmin"]),
};
</script>

<style lang="scss">
@import "./card-photo-styles.scss";
</style>
