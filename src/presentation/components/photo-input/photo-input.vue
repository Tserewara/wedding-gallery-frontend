<template>
  <div class="photoInput">
    <input type="file" id="file" class="file" />
    <label for="file">
      <i class="fa-solid fa-image"></i>
      <p>Upload photo</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "PhotoInput",
};
</script>

<style lang="scss">
@import "./photo-input-styles.scss";
</style>
