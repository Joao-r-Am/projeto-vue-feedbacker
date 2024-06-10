import axios from "axios";
import AuthService from "./auth";
import router from "@/router";
import UserService from "./users";
import { setGlobalLoading } from "@/store/global";
import FeedbacksServices from "./feedbacks";

const API_ENVS = {
  production: "backend-dashboard-jade.vercel.app/",
  development: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use((error) => {
  const canThrowAnError =
    error.request.status === 0 || error.request.status === 500;
  if (canThrowAnError) {
    setGlobalLoading(false);
    throw new Error(error.message);
  }

  if (error.status === 401) {
    setGlobalLoading(false);
    router.push({ name: "Home" });
  }
  setGlobalLoading(false);

  return error;
});

export default {
  auth: AuthService(httpClient),
  users: UserService(httpClient),
  feedbacks: FeedbacksServices(httpClient),
};
