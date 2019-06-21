import { currentUserRaw } from './SampleData';

const currentUserReducer = (user = currentUserRaw, action) => {
  return user;
};

export default currentUserReducer;
