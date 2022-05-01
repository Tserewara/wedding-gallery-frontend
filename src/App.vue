<template>
  <header class="headerWrap">
    <h1>Wedding Gallery</h1>
  </header>
  <div class="mainWrap">
    <div class="fileInput">
      <input type="file" id="file" class="file" />
      <label for="file">Upload photo</label>
    </div>
    <div class="card" :key="index" v-for="(photo, index) in photos">
      <h3>uploaded by {{ photo }}</h3>
      <img src="https://via.placeholder.com/500" />
      <div class="likeWrap">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="commentsWrap">
        <p class="more">Load more comments</p>
        <div class="comment" :key="index" v-for="(comment, index) in comments">
          <p class="author">John</p>
          <p class="content">{{ comment }}</p>
        </div>
        <input type="text" placeholder="Write a comment" />
        <button>Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.headerWrap {
  text-align: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: $white;
  color: $primary;
  padding: 1rem;
  margin-bottom: 1rem;
}

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.fileInput label {
  display: block;
  position: relative;
  width: 500px;
  height: 50px;
  border-radius: 16px;
  background: $primary;
  opacity: 0.8;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  margin: 16px;
}

input:hover + label,
input:focus + label {
  transform: scale(1.02);
}
.mainWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  .card {
    margin-bottom: 32px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: $white;

    h3 {
      padding: 8px;
      color: $gray;
    }

    .likeWrap {
      padding: 12px;
      border-bottom: 1px solid $lightGray;

      i {
        font-size: 24px;
        color: $primary;
        cursor: pointer;
      }
    }

    .commentsWrap {
      display: flex;
      flex-direction: column;
      padding: 12px;

      .more {
        margin: 0 8px 8px;
        color: $gray;
        cursor: pointer;
      }

      .comment {
        background: $background;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 8px;
        color: $gray;

        .author {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 8px;
          color: $black;
        }
      }

      input {
        margin: 16px 0;
        padding: 8px;
        border-radius: 8px;
        line-height: 3;
        border: none;
        background-color: $background;
        font-size: 16px;
      }

      button {
        border-radius: 6px;
        border: none;
        line-height: 2;
        width: 8rem;
        cursor: pointer;
        background-color: $primary;
        color: $white;
        font-size: 14px;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
</style>
