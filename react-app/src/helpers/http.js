import axios from 'axios';
import { config } from './config';
import { store } from '../state/store';

export const http = axios.create({
  baseURL: config.apiEndpoint,
});

http.interceptors.request.use(
  function (config) {
    const session = store.getState().user.login.jwt;
    if (session !== null) {
      config.headers.Authorization = `Bearer ${session}`;
      config.headers['Content-Type'] = 'application/json';
      return config;
    } else {
      config.headers['Content-Type'] = 'application/json';
      return config;
    }
  },
  function (err) {
    return Promise.reject(err);
  }
);
