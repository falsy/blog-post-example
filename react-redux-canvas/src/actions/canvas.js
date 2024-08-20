import { SET_CANVAS } from '../constants';

export function setCanvas(el) {
  return {
    type: SET_CANVAS,
    element: el
  };
}
