import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://long-sun-5530.fly.dev/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default customAxios;
