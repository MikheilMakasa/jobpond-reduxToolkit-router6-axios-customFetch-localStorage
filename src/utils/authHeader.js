// making a function so we don't have to type every time
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export default authHeader;
