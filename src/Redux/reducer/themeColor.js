import type from '../type';

const inital_state = {
  themeType: 'true',
};

export default function themeChange(state = inital_state, action) {
  switch (action.type) {
    case type.ThemeColorDark:
      break;

    default:
      return state;
  }
}
