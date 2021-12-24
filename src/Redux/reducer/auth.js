import types from '../type';

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LOGIN:
      const data = action.payload;
      // console.log("shdjshjdshjdhs")
      return {userData: data};

    default:
      return {...state};
  }
}
