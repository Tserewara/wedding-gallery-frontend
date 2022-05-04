<template>
  <div class="commentsContainerWrap">
    <p class="more">Show all comments</p>
    <div class="comment" :key="index" v-for="(comment, index) in comments">
      <p class="author">{{ comment.username }}</p>
      <p class="content">{{ comment.text }}</p>
    </div>
    <input v-model="newComment" type="text" placeholder="Write a comment" />
    <button @click="handleSubmit">Comment</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import remoteAddCommentFactory from "@/main/factories/domain/usecases/remote-add-comment-factory";

export default {
  name: "CommentsContainer",
  props: {
    comments: Array,
    photoId: String,
  },
  data() {
    return {
      newComment: "",
    };
  },

  methods: {
    ...mapActions(["addComment"]),

    async handleSubmit() {
      const remoteAddComment = remoteAddCommentFactory();
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await remoteAddComment.add(
        userId,
        this.photoId,
        this.newComment,
        token
      );
      this.addComment(response);
      this.newComment = "";
    },
  },
};
</script>

<style lang="scss">
@import "./comments-container-styles.scss";
</style>
