//todo: add group parameter
export const fetchSongLogs = () => {
  return {
    type: 'FETCH'
  };
};

export function upVote(val){
  return {
    type: 'UPVote',
    payload: val
  }
}

export const downVote = (val) => {
  return {
    type: 'DOWNVote',
    payload: val
  }
}

export const upComplete = (val) => {
  return {
     type: 'UPComplete',
     payload: val
  }
}

export const downComplete = (val) => {
  return {
    type: 'DOWNComplete',
    payload:val
  }
}