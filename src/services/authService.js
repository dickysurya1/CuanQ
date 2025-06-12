import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const register = async (data) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};

export const loginService = async (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};
