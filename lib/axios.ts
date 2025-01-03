import axios from "axios";

export const AxiosInStance = axios.create({
  // baseURL: "http://localhost/appadmin-backend",
  baseURL: "https://application.abaqas.in/schedule/actions.php",
});
