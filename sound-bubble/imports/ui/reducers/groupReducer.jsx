const groupReducer = (action) => {
    switch (action.type) {
      case 'DELETE_GROUP':
        return action.result;
      case 'CREATE_GROUP':
        return action.result;
    }
  };
  
  export default groupReducer;
  