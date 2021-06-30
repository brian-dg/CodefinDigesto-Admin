import { createAction } from "redux-actions";

import { Signin } from "../../services/AuthService";

import { USER_TOKEN } from "../../utils/constants";


export const LOGIN_START = createAction("LOGIN_START");
export const LOGIN_SUCCESS = createAction("LOGIN_SUCCESS");
export const LOGIN_ERROR = createAction("LOGIN_ERROR");
export const ERASE_ALL = createAction("ERASE_ALL");
export const LOGOUT = createAction("LOGOUT");

export const logIn = ({email,password,history}:any) => {
  return async (dispatch: any) => {
    try {
      dispatch(logOut())
      dispatch(LOGIN_START(true));
      const response: any = await Signin({email,password});
      if (response.error) return dispatch(LOGIN_ERROR(response.message));
      dispatch(LOGIN_SUCCESS(response.data));
      localStorage.setItem(USER_TOKEN, response.data.token);
      console.log(response.data.token)
      history.push('/')
      dispatch(LOGIN_START(false));
    } catch (err) {
      console.log("Auth Error", err);
      dispatch(LOGIN_ERROR(err));
      dispatch(LOGIN_START(false));
    }
  };
};

export const logOut = () => {
  return (dispatch: any) => {
    dispatch(ERASE_ALL());
    localStorage.removeItem(USER_TOKEN);
  };
};
