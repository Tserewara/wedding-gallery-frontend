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
  async addComment({ commit }, payload) {
    commit("setComment", payload);
  },
};

const mutations = {
  setInitialPhotos: (state, photos) => {
    state.photos = photos;
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
