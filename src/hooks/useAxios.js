import axios from "axios";
//import { useCallback } from "react";

//const api = axios.create({
//  baseURL: "http://localhost:3001", 
//});

const useAxios = () => {
  const get = (url) => {
    return axios.get(url);
  };

  const post = (url, data) => {
    return axios.post(url, data);
  };

  const patch = (url, data) => {
    return axios.patch(url, data);
  };

  const remove = (url) => {
    return axios.delete(url);
  };

  return { get, post, patch, remove };
};

export default useAxios;
