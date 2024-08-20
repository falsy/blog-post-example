import { SET_CANVAS } from '../constants';

const initialState = {
  canvas: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CANVAS:
      return { ...state, element: action.element };
    default:
      return state;
  }
}