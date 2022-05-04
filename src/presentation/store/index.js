import { createStore } from "vuex";
import photos from "./modules/photos";

const store = createStore({
  modules: {
    photos,
  },
});

export default store;
