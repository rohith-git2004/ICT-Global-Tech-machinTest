import axios from "axios";

const API = axios.create({
  baseURL: "https://ict-global-tech-machintest.onrender.com/api/tasks",
});

export default API;