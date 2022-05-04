const state = {
  isAdmin: false,
};

const getters = {
  isAdmin: (state) => state.isAdmin,
};

const actions = {
  async setUserIsAdmin({ commit }, isAdmin) {
    commit("setCurrentUserIsAdmin", isAdmin);
  },
};

const mutations = {
  setCurrentUserIsAdmin: (state, isAdmin) => {
    state.isAdmin = isAdmin;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
