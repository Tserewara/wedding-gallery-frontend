<template>
  <div class="cardPhotoWrap">
    <h3>uploaded by {{ photo.username }}</h3>
    <img :src="formatImageAddress(photo.image_address)" />
    <div class="likeWrap">
      <i class="fa-solid fa-heart"></i>
      <button v-if="isAdmin" @click="handleClick">Approve Photo</button>
    </div>
    <CommentsContainer :comments="photo.comments" :photoId="photo._id" />
  </div>
</template>

<script>
import CommentsContainer from "@/presentation/components/comments-container/comments-container.vue";
import { mapGetters } from "vuex";
import RemoteApprovePhoto from "../../../domain/usecases/remote-approve-photo";
import apiUrlFactory from "../../../main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "../../../main/factories/infra/axios-http-client-factory";

export default {
  name: "CardPhoto",
  components: { CommentsContainer },
  props: {
    photo: Object,
  },
  methods: {
    formatImageAddress(address) {
      return `https://friends-gallery.s3.sa-east-1.amazonaws.com/${address}`;
    },
    async handleClick() {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const url = apiUrlFactory("/photos");
      const axiosHttpClient = axiosHttpClientFactory();
      const remoteApprovePhoto = new RemoteApprovePhoto(url, axiosHttpClient);

      const reponse = await remoteApprovePhoto.approve(
        userId,
        this.photo._id,
        token
      );
    },
  },

  computed: mapGetters(["isAdmin"]),
};
</script>

<style lang="scss">
@import "./card-photo-styles.scss";
</style>
