import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type Dispatch = ThunkDispatch<{}, void, Action>;