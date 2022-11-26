import axios from 'axios';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

// we can also use this instead of indicating headers every time, we need to remove headers from request if we use this

// customFetch.interceptors.request.use(
//   (config) => {
//     const user = getUserFromLocalStorage();
//     if (user) {
//       config.headers['Authorization'] = `Bearer ${user.token}`;
//       // in the latest version "common" returns undefined
//       // config.headers.common['Authorization'] = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
