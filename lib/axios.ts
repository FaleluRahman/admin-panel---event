import axios from "axios";

export const AxiosInStance = axios.create({
  // baseURL: "http://localhost/students_backend",
  baseURL: "https://rend-application.abaqas.in/",
});
