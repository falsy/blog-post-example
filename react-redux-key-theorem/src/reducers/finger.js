import { SET_FINGER } from '../constants';

const initialState = {
  number: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FINGER:
      return { ...state, number: action.number };
    default:
      return state;
  }
}