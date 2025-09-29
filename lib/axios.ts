import axios from "axios";

export const AxiosInStance = axios.create({
  // baseURL: "http://localhost/appadmin-backend",
  baseURL: "https://rend-application.abaqas.in/",
});
