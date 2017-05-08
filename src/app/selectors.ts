import { GlobalState } from '../rootReducer';

export const getIsDropdownOpen = (state: GlobalState): boolean => state.app.isDropdownOpen;
