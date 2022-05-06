<template>
  <div class="commentsContainerWrap">
    <p v-if="!showAll" class="more" @click="toggleComments">
      Show all comments
    </p>
    <div class="comment" :key="index" v-for="(comment, index) in commentsToShow">
      <p class="author">{{ comment.username }}</p>
      <p class="content">{{ comment.text }}</p>
    </div>
    <p v-if="showAll" class="more" @click="toggleComments">Hide comments</p>
    <input v-model="newComment" type="text" placeholder="Write a comment" />
    <div class="buttonContainer">
      <button @click="handleSubmit">Comment</button>
      <div class="loadingComment" v-if="loading">
        <GallerySpinner />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import remoteAddCommentFactory from "@/main/factories/domain/usecases/remote-add-comment-factory";
import { useToast } from "vue-toastification";
import TokenExpiredError from "@/domain/errors/token-expired-error";
import GallerySpinner from "@/presentation/components/gallery-spinner/gallery-spinner.vue";

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
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    commentsToShow() {
      return this.showAll ? this.comments : this.comments.slice(0, 1);
    },
  },
  methods: {
    ...mapActions(["addComment"]),
    async handleSubmit() {
      const remoteAddComment = remoteAddCommentFactory();
      const token = localStorage.getItem("token");
      if (!this.newComment.trim()) return;
      const toast = useToast();
      try {
        this.loading = true;
        const response = await remoteAddComment.add(
          this.currentUser.userId,
          this.photoId,
          this.newComment,
          token
        );
        this.addComment(response);
        this.newComment = "";
        this.loading = false;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          localStorage.clear();
          this.$router.push("/login");
        }
        toast.error(`Server Error: ${error.message}`);
      }
    },
    toggleComments() {
      this.showAll = !this.showAll;
    },
  },
  components: { GallerySpinner },
};
</script>

<style lang="scss">
@import "./comments-container-styles.scss";
</style>
