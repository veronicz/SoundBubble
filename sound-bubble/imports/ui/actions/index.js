//todo: add group parameter
export const fetchSongLogs = () => {
  return {
    type: 'FETCH'
  };
};

export function upVote(val){
  return val += 1;
}

export const downVote = () => {
  return {
    type: 'DOWNVote'
  }
}

export const upComplete = () => {
  return {
     type: 'UPComplete'
  }
}

export const downComplete = () => {
  return {
    type: 'DOWNComplete'
  }
}