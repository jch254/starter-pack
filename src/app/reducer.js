import { Map } from 'immutable';

export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';

export const initialState = Map({
  isDropdownOpen: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return state.set('isDropdownOpen', !state.get('isDropdownOpen'));
    default:
      return state;
  }
}

export const toggleDropdown = () => (
  {
    type: TOGGLE_DROPDOWN,
  }
);
