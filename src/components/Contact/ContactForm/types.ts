export interface ReducerStateTypes {
  email?: string;
  name?: string;
  message?: string;
}

export interface ReducerActionTypes {
  type: string;
  payload: ReducerStateTypes
}
