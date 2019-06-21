import { profilesRaw } from './SampleData';

const userProfileReducer = (profiles = profilesRaw.profiles, action) => {
  return profiles;
};

export default userProfileReducer;
