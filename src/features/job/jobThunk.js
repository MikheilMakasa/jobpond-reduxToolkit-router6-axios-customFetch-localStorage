import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';
// we import these functions from allJobsSlice to create a delete job async function
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import authHeader from '../../utils/authHeader';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());

  try {
    const resp = await customFetch.delete(
      `/jobs/${jobId}`,
      authHeader(thunkAPI)
    );
    // then we get the latest data
    thunkAPI.dispatch(getAllJobs());
    // this return turns into payload
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
