export const createGroup = (groupName, creatorId) => {
  return (dispatch, getState) => {
    Meteor.call('createGroup', groupName, (err, result) => {
      if (err) {
        console.log('Creating group failed: ', err);
      }
    });
  };
};

export const deleteGroup = groupId => {
  return (dispatch, getState) => {
    Meteor.call('deleteGroup', groupId, (err, result) => {
      if (err) {
        console.log('Deleting group failed: ', err);
      }
    });
  };
};

export const leaveGroup = groupId => {
  return (dispatch, getState) => {
    Meteor.call('leaveGroup', groupId, (err, result) => {
      if (err) {
        console.log('Leaving group failed: ', err);
      }
    });
  };
};
