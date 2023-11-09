import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://old-sound-9762.fly.dev/api",

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default customAxios;
