import types from '../type';

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LOGIN:
      const data = action.payload;
      return {userData: data};

    default:
      // console.log(14, state);
      return {...state};
  }
}
