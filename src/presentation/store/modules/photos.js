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
};

const mutations = {
  setInitialPhotos: (state, photos) => {
    state.photos = photos;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
