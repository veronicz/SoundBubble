export const createGroup = (groupName, creatorId) => {
  return (dispatch, getState) => {
    Meteor.call('createGroup', groupName, (err, result) => {
      if (err) {
        console.log('Creating group failed: ', err);
      }
    });
  };
};

export const leaveGroup = groupId => {
  return (dispatch, getState) => {
    Meteor.call('leaveGroup', groupId, (err, result) => {
      if (err) {
        console.log('Leaving group failed: ', err);
      } else if (getState().currentGroupId === groupId) {
        dispatch(removeCurrentGroup());
      }
    });
  };
};

export const removeCurrentGroup = () => {
  return {
    type: 'REMOVE_GROUP'
  };
};

export const addGroupMember = (groupId, userId) => {
  return (dispatch, getState) => {
    Meteor.call('addGroupMember', groupId, userId, err => {
      if (err) {
        console.log('Add new group member failed: ', err);
      }
    });
  };
};

export const promoteAdmin = (groupId, userId) => {
  return (dispatch, getState) => {
    Meteor.call('promoteAdmin', groupId, userId, err => {
      if (err) {
        console.log('Promote new admin failed: ', err);
      }
    });
  };
};

export const removeGroupMember = (groupId, userId) => {
  return (dispatch, getState) => {
    Meteor.call('removeGroupMember', groupId, userId, err => {
      if (err) {
        console.log('Remove group member failed: ', err);
      }
    });
  };
};
