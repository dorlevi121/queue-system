import axios from "axios";

const instance = axios.create({
   baseURL: "http://localhost:8080/",
  // baseURL: "https://queue-jz36q4rkyq-uk.a.run.app/",
  //baseURL: "https://34.69.25.108:8080/",

  headers: {
    "Access-Control-Allow-Origin": true,
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers["token"] = "" + token;

    const domain = "" + localStorage.getItem("domain");
    if (domain) config.headers["domain"] = "" + domain;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
