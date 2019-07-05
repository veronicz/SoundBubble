import Groups from '../../api/groups';

export const changeCurrentGroup = groupId => {
  return {
    type: 'USERS_IN_CURRENT_GROUP',
    users: Groups.findOne({ _id: groupId }).userIds
  };
};
