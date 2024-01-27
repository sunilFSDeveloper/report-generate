const initialState = {
    headerText: {},
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_HEADER':
        return {
          ...state,
          headerText: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  