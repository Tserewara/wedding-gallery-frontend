const state = {
  currentUser: {
    userId: null,
    isAdmin: false,
  },
};

const getters = {
  currentUser: (state) => state.currentUser,
};

const actions = {
  async saveCurrentUser({ commit }, payload) {
    commit("setCurrentUser", payload);
  },
};

const mutations = {
  setCurrentUser: (state, payload) => {
    state.currentUser = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
