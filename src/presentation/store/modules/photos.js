const state = {
  photos: [],
};

const getters = {
  allPhotos: (state) => state.photos,
};

const actions = {
  async loadPhotos({ commit }, response) {
    commit("setPhotos", response);
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
  async likePhoto({ commit }, photo) {
    commit("setLikePhoto", photo);
  },
};

const mutations = {
  setPhotos: (state, photos) => {
    state.photos = [...state.photos, ...photos];
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
  setLikePhoto: (state, payload) => {
    payload.photo.likes.push(payload.userId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
