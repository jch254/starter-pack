export interface AppState {}

export const initialState: AppState = {};

export default function reducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
