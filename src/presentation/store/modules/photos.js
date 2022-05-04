const state = {
  photos: [],
};

const getters = {
  allPhotos: (state) => state.photos,
};

const actions = {
  async loadPhotos({ commit }, response) {
    commit("setInitialPhotos", response);
  },
  async addPhoto({ commit }, photo) {
    commit("setPhoto", photo);
  },
  async addComment({ commit }, photo) {
    commit("setComment", photo);
  },
};

const mutations = {
  setInitialPhotos: (state, photos) => {
    state.photos = photos;
  },
  setPhoto: (state, photo) => {
    console.log("THIS", photo);
    state.photos.unshift(photo);
  },
  setComment: (state, payload) => {
    const photo = state.photos.find((item) => item._id === payload.photo_id);
    photo.comments.unshift(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
