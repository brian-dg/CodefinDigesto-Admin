import { combineReducers } from "redux";
import AuthState, { AuthInitialState } from "./Auth";

interface State {
  AuthState: AuthInitialState;
}

const State = combineReducers({
  AuthState,
});

export default State;
