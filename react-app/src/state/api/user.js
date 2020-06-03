import { http } from '../../helpers';
export const registerAPI = async ({ data }) => {
  try {
    let response = await http.post(`/register`, data);
    return response;
  } catch (error) {
    throw new error(error);
  }
};
export const loginAPI = async ({ data }) => {
  try {
    let response = await http.post(`/login`, data);
    return response;
  } catch (error) {
    throw new error(error);
  }
};
