<template>
  <div class="commentsContainerWrap">
    <p class="more">Load more comments</p>
    <div class="comment" :key="index" v-for="(comment, index) in firstComment">
      <p class="author">John</p>
      <p class="content">{{ comment }}</p>
    </div>
    <input type="text" placeholder="Write a comment" />
    <button>Comment</button>
  </div>
</template>

<script>
export default {
  name: "CommentsContainer",
  props: {
    comments: Array,
  },
  computed: {
    firstComment() {
      return this.comments.slice(0, 1);
    },
  },
};
</script>

<style lang="scss">
@import "./comments-container-styles.scss";
</style>
