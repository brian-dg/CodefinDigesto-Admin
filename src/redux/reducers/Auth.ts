import { handleActions } from "redux-actions";

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  ERASE_ALL,
} from "../actions/AuthActions";

export interface AuthInitialState {
  authData: object;
  authLoading: boolean;
  authError: string;
}

const AuthInitialState: AuthInitialState = {
  authData: {},
  authLoading: false,
  authError: "",
};

export default handleActions(
  {
    [LOGIN_START as any]: (state, action: any) => {
      return {
        ...state,
        authLoading: action.payload,
        authError: "",
      };
    },
    [LOGIN_SUCCESS as any]: (state, action: any) => {
      return {
        ...state,
        authData: action.payload,
        authError: "",
        authLoading: false,
      };
    },
    [LOGIN_ERROR as any]: (state, action: any) => {
      return {
        ...state,
        authError: action.payload,
        authLoading: false,
      };
    },
    [ERASE_ALL as any]: () => {
      return AuthInitialState;
    },
  },
  AuthInitialState
);
