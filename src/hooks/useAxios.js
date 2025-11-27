import axios from "axios";
import { useCallback } from "react";

const useAxios = () => {
  const get = useCallback((url) => {
    return axios.get(url);
  }, []);

  const post = useCallback((url, data) => {
    return axios.post(url, data);
  }, []);

  const patch = useCallback((url, data) => {
    return axios.patch(url, data);
  }, []);

  const remove = useCallback((url) => {
    return axios.delete(url);
  }, []);

  return { get, post, patch, remove };
};

export default useAxios;
