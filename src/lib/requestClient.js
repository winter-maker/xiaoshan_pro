import Vue from "vue";
//import router from "../router";
import axios from "axios";
import qs from "qs";
import _ from "lodash";
import { BASE_URL } from "../config";

// let router = null
// const initRoute = (val) =>{
// 	router = val
// }
const getRequest = (url, data) => {
  let urlData = url;
  urlData += _.isEmpty(data) ? "" : `?${queryParameters(data)}`;
  return request({ url: urlData, method: "GET" });
};

const request = (options) => {
  options.headers = options.headers || {};
  options.baseURL = BASE_URL;
  options.headers["Authorization"] = localStorage.getItem("token") || "";
  options.timeout = options.timeout || 5000;
  let isOk = true;

  return axios(options)
    .then((response) => {
      let status = response.status,
        data = response.data,
        message = response.message;
      if (status > 400) {
        isOk = false;
      }
      if (status == 200) {
        if (response.headers.authorization) {
          localStorage.setItem("token", response.headers.authorization);
        }
      } else if (status == 201 || status == 202) {
        console.log(message);
        //router.push("/login");
      } else {
        console.log(message);
      }
      return { status, data };
    })
    .then((res) => {
      return isOk ? Promise.resolve(res) : Promise.reject(res);
    })
    .catch((error) => {
      if (error.response && error.response.status == 401 && router) {
        localStorage.setItem("token", "");
        //router.push({ path: "/login" });
      }
      return Promise.reject(_.isString(error) ? new Error(error) : error);
    })
    .finally(() => {});
};
const postRequest = (url, options = {}) => {
  return request({
    url: url,
    data: qs.stringify(options.body),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: options.method || "POST",
  });
};

const queryParameters = (data) =>
  Object.keys(data)
    .map((key) => [key, data[key]].map(encodeURIComponent).join("="))
    .join("&");

const query = (params) => {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;
  return {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    filter: JSON.stringify(params.filter),
  };
};

export { getRequest, postRequest };
