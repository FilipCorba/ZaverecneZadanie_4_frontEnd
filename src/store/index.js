import { createStore } from "vuex";
import en from "@language/en.js";
import sk from "@language/sk.js";

export default createStore({
  state: {
    selectedLanguage: "en", // Default selected language
  },
  mutations: {
    changeLanguage(state, language) {
      state.selectedLanguage = language;
    },
  },
  getters: {
    currentLanguage(state) {
      return state.selectedLanguage;
    },
    currentTranslations(state) {
      return state.selectedLanguage === "en" ? en : sk;
    },
  },
});
