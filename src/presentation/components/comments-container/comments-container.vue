<template>
  <div class="commentsContainerWrap">
    <p v-if="!showAll" class="more" @click="toggleComments">
      Show all comments
    </p>
    <div
      class="comment"
      :key="index"
      v-for="(comment, index) in commentsToShow"
    >
      <p class="author">{{ comment.username }}</p>
      <p class="content">{{ comment.text }}</p>
    </div>
    <p v-if="showAll" class="more" @click="toggleComments">Hide comments</p>
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
      showAll: false,
    };
  },

  computed: {
    commentsToShow() {
      return this.showAll ? this.comments : this.comments.slice(0, 1);
    },
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
    toggleComments() {
      this.showAll = !this.showAll;
    },
  },
};
</script>

<style lang="scss">
@import "./comments-container-styles.scss";
</style>
