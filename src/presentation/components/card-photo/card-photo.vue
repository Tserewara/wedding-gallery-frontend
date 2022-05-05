<template>
  <div class="cardPhotoWrap">
    <h3>uploaded by {{ photo.username }}</h3>
    <img :src="formatImageAddress(photo.image_address)" />
    <div class="likeWrap">
      <i
        class="fa-solid fa-heart"
        :class="{ liked: isLikedByCurrentUser }"
        @click="handleLikeClick"
      ></i>
      <button
        v-if="currentUser.isAdmin && !photo.is_approved"
        @click="handleApproveClick"
      >
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
import remoteLikePhotoFactory from "@/main/factories/domain/usecases/remote-like-photo-factory";
import TokenExpiredError from "@/domain/errors/token-expired-error";

export default {
  name: "CardPhoto",
  components: { CommentsContainer },
  props: {
    photo: Object,
  },
  methods: {
    ...mapActions(["approvePhoto", "likePhoto"]),
    formatImageAddress(address) {
      return `https://friends-gallery.s3.sa-east-1.amazonaws.com/${address}`;
    },
    isTokenExpired(error) {
      if (error instanceof TokenExpiredError) {
        localStorage.clear();
        this.$router.push("/login");
      }
    },

    async handleApproveClick() {
      const toast = useToast();

      const token = localStorage.getItem("token");
      const remoteApprovePhoto = remoteApprovePhotoFactory();

      try {
        const response = await remoteApprovePhoto.approve(
          this.currentUser.userId,
          this.photo._id,
          token
        );
        toast.success(response.msg);
        this.approvePhoto(this.photo);
      } catch (error) {
        this.isTokenExpired(error);
        toast.error(error.message);
      }
    },
    async handleLikeClick() {
      const toast = useToast();
      const token = localStorage.getItem("token");

      const remoteLikePhoto = remoteLikePhotoFactory();

      try {
        await remoteLikePhoto.like(
          this.currentUser.userId,
          this.photo._id,
          token
        );
        this.likePhoto({ photo: this.photo, userId: this.currentUser.userId });
      } catch (error) {
        this.isTokenExpired(error);
        toast.error(error.message);
      }
    },
  },

  computed: {
    ...mapGetters(["currentUser"]),
    isLikedByCurrentUser() {
      return this.photo.likes.includes(this.currentUser.userId);
    },
  },
};
</script>

<style lang="scss">
@import "./card-photo-styles.scss";
</style>
