import types from '../type';

const initialState = {
  savePosts: [],
};

export default function saveData(state = initialState, action) {
  switch (action.type) {
    case types.SAVEPOSTS:
      return {...state, savePosts: [...state.savePosts, action.payload]};
      break;
    case types.DELETEPOSTS:
      return {
        ...state,
        savePosts: {
          ...state.savePosts.filter(
            savePosts => savePosts.id !== action.payload.id,
          ),
        },
      };
    default:
      return state;
      break;
  }
}
