import axios from "axios";

const API = axios.create({
  //@todo does this need to be conditional?
  baseURL: 'http://localhost:8080/api/v1/'
});

export default API;