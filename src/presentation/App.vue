<template>
  <GalleryHeader />
  <div class="mainWrap">
    <PhotoInput />
    <CardPhoto />
  </div>
</template>

<script>
import GalleryHeader from "@/presentation/components/gallery-header/gallery-header.vue";
import PhotoInput from "@/presentation/components/photo-input/photo-input.vue";
import CardPhoto from "@/presentation/components/card-photo/card-photo.vue";

export default {
  components: { GalleryHeader, PhotoInput, CardPhoto },
  name: "App",
  data() {
    return {
      photos: ["john", "tserewara", "tsere", "alf"],
      comments: ["Great moment"],
    };
  },
};
</script>

<style lang="scss">
body {
  background: $background;
}

.mainWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
</style>
