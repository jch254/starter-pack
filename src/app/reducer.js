import {
  TOGGLE_DROPDOWN,
} from './actions';

export const initialState = {
  dropdownOpen: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return {
        ...state,
        dropdownOpen: !state.dropdownOpen,
      };
    default:
      return state;
  }
}
