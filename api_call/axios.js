import baseAxios from 'axios';

baseAxios.defaults.auth = {
  username: '09999999999',
  password: 'password',
};
// const { API } = process.env;
const API = 'http://127.0.0.1:8000/api/v1/';
baseAxios.defaults.baseURL = API;
if (process.env.__DEV__ === true || true) {
  // baseAxios.interceptors.request.use((request) => {
  //   console.log('log:: request:', request);
  //   return request;
  // });
  // baseAxios.interceptors.response.use((response) => {
  //   console.log('log:: response:', response);
  //   return response;
  // });
}
const axios = baseAxios;
export default axios;
