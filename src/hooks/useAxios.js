import axios from "axios";
import { useCallback } from "react";

const api = axios.create({
  baseURL: "http://localhost:3001", 
});

const useAxios = () => {
  const get = useCallback((url) => {
    return api.get(url);
  }, []);

  const post = useCallback((url, data) => {
    return api.post(url, data);
  }, []);

  const patch = useCallback((url, data) => {
    return api.patch(url, data);
  }, []);

  const remove = useCallback((url) => {
    return api.delete(url);
  }, []);

  return { get, post, patch, remove };
};

export default useAxios;
