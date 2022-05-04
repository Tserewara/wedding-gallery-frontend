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
import RemoteAddComment from "@/domain/usecases/remote-add-comment";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";

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
    async handleSubmit() {
      const url = apiUrlFactory("/comment");
      const axiosHttpClient = axiosHttpClientFactory();
      const remoteAddComment = new RemoteAddComment(url, axiosHttpClient);
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await remoteAddComment.add(
        userId,
        this.photoId,
        this.newComment,
        token
      );
      console.log(response);
    },
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
