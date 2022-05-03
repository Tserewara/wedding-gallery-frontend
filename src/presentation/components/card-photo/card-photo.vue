<template>
  <div class="cardPhotoWrap">
    <h3>uploaded by {{ photo.username }}</h3>
    <img :src="formatImageAddress(photo.image_address)" />
    <div class="likeWrap">
      <i class="fa-solid fa-heart"></i>
    </div>
    <CommentsContainer :comments="comments" />
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
    return {
      comments: [
        "Great moment",
        "Great Day",
        "It was a remarkable day",
        "Wish you the best",
      ],
    };
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
