<template>
  <div class="cardPhotoWrap">
    <h3>uploaded by {{ photo.username }}</h3>
    <img :src="formatImageAddress(photo.image_address)" />
    <div class="likeWrap">
      <i class="fa-solid fa-heart"></i>
    </div>
    <CommentsContainer :comments="photo.comments" :photoId="photo._id" />
  </div>
</template>

<script>
import CommentsContainer from "@/presentation/components/comments-container/comments-container.vue";

export default {
  name: "CardPhoto",
  components: { CommentsContainer },

  props: {
    photo: Object,
  },

  data() {
    return {};
  },
  methods: {
    formatImageAddress(address) {
      return `https://friends-gallery.s3.sa-east-1.amazonaws.com/${address}`;
    },
  },
};
</script>

<style lang="scss">
@import "./card-photo-styles.scss";
</style>
