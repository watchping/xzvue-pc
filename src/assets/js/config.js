import axios from "axios";
//axios.defaults.baseURL = "http://115.159.160.93:8080";
//axios.defaults.baseURL ="http://xzserver.applinzi.com"
axios.defaults.baseURL ="http://localhost:5050";
//axios.defaults.baseURL = "api";
axios.defaults.withCredentials = true;

export { axios };
