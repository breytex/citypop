import axios from "axios";

export default axios.create({
  baseURL: "https://api.teleport.org/api",
  headers: {
    "Content-type": "application/json"
  }
});