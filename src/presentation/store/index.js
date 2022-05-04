import { createStore } from "vuex";
import photos from "./modules/photos";
import user from "./modules/user";

const store = createStore({
  modules: {
    photos,
    user,
  },
});

export default store;
