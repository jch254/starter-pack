import iassign = require('immutable-assign');

export interface ToggleDropdown {
  type: 'TOGGLE_DROPDOWN';
}

export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const toggleDropdown = (): ToggleDropdown => ({
  type: TOGGLE_DROPDOWN,
});

type AppAction = ToggleDropdown;

export interface AppState {
  isDropdownOpen: boolean;
}

export const initialState: AppState = {
  isDropdownOpen: false,
};

export default function reducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return iassign(
        state,
        state => state.isDropdownOpen,
        isDropdownOpen => !isDropdownOpen,
      );
    default:
      return state;
  }
}
