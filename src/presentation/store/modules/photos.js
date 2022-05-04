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
  async approvePhoto({ commit }, photo) {
    commit("setApprovePhoto", photo);
  },
};

const mutations = {
  setInitialPhotos: (state, photos) => {
    state.photos = photos;
  },
  setPhoto: (state, photo) => {
    state.photos.unshift(photo);
  },
  setComment: (state, payload) => {
    const photo = state.photos.find((item) => item._id === payload.photo_id);
    photo.comments.unshift(payload);
  },
  setApprovePhoto: (state, photo) => {
    photo.is_approved = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
