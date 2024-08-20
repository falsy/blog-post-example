import { SET_FINGER } from '../constants';

export function setFinger(no) {
  return {
    type: SET_FINGER,
    number: no
  }
}