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
export const userGetAllAPI = async ({ data }) => {
  try {
    let response = await http.get(`/api/user/all`, data);
    return response;
  } catch (error) {
    throw new error(error);
  }
};
export const userEditAPI = async ({ data }) => {
  try {
    let response = await http.patch(`/api/user/${data.userID}`, data);
    return response;
  } catch (error) {
    throw new error(error);
  }
};
export const userDeleteAPI = async ({ data }) => {
  try {
    let response = await http.delete(`/api/user/${data.userID}`);
    return response;
  } catch (error) {
    throw new error(error);
  }
};
