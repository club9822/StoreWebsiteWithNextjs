import axios from './axios';

export async function getUsersList(page = 1) {
  let res = {
    results: [],
    count: 0,
    next: null,
    previous: null,
    status: null,
    msg: '',
    error: null,
  };
  try {
    const response = await axios(`users/${`?page=${page}`}`, { method: 'get' });
    res = { ...response.data, status: response?.status };
  } catch (e) {
    res.error = e?.response?.data;
    res.status = e?.response?.status;
  }
  return res;
}
export async function getUser(id = null) {
  let user = {
    id,
    mobile: '',
    national_id: '',
    status: null,
    error: null,
  };
  if (!id) {
    user.error = 'user id need';
    return user;
  }
  try {
    const response = await axios(`users/${id}`, { method: 'get' });
    user = response.data;
    user.status = response?.status;
  } catch (e) {
    user.status = e?.response?.status;
  }
  return user;
}
