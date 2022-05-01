<template>
  <div class="cardPhotoWrap" :key="index" v-for="(photo, index) in photos">
    <h3>uploaded by {{ photo }}</h3>
    <img src="https://via.placeholder.com/500" />
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
  data() {
    return {
      photos: ["john", "tserewara", "tsere", "alf"],
      comments: [
        "Great moment",
        "Great Day",
        "It was a remarkable day",
        "Wish you the best",
      ],
    };
  },
  components: { CommentsContainer },
};
</script>

<style lang="scss">
@import "./card-photo-styles.scss";
</style>
