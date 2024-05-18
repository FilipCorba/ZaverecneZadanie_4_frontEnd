import { createStore } from "vuex";
import en from "@language/en.js";
import sk from "@language/sk.js";

export default createStore({
  state: {
    selectedLanguage: "en", // Default selected language
    token: localStorage.getItem("token") || null, // Initialize token from localStorage
  },
  mutations: {
    changeLanguage(state, language) {
      state.selectedLanguage = language;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token); // Update token in localStorage
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  getters: {
    currentLanguage(state) {
      return state.selectedLanguage;
    },
    currentTranslations(state) {
      return state.selectedLanguage === "en" ? en : sk;
    },
    isAuthenticated(state) {
      return state.token !== null; // Check if the user is authenticated based on the presence of token
    },
  },
});
