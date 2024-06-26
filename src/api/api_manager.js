import axios from "axios";

const ApiCompetitionFlowManager = axios.create({
  baseURL: import.meta.env.VITE_DOCKER_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

ApiCompetitionFlowManager.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiCompetitionFlowManager;
