import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://patient-grass-8418.fly.dev/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default customAxios;
