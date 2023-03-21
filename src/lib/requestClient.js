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
  options.headers["x-acs-dingtalk-access-token"] = sessionStorage.getItem("token") || "";
  options.timeout = options.timeout || 5000;
  let isOk = true;

  return axios(options)
    .then((response) => {
      console.log('---response---',response)
      let status = response.status,
        data = response.data,
        message = response.message;
      if (status > 400) {
        isOk = false;
      }
      if (status == 200) {
        if (response.headers.authorization) {
          sessionStorage.setItem("token", response.headers.authorization);
        }
      }
      return { status, data };
    })
    .then((res) => {
      return isOk ? Promise.resolve(res) : Promise.reject(res);
    })
    .catch((error) => {
      if (error.response && error.response.status == 401 && router) {
        sessionStorage.setItem("token", "");
        //router.push({ path: "/login" });
      }
      return Promise.reject(_.isString(error) ? new Error(error) : error);
    })
    .finally(() => {});
};
const postRequest = (url, options = {}) => {
  return request({
    url: url,
    data: options.body,
    headers: Object.assign({}, { "Content-Type": "application/json" }, options.headers),
    method: "POST",
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
