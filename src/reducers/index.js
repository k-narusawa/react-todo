import { combineReducers } from "redux";
import todo from "./todo"
import { reducer as form } from "redux-form"

export default combineReducers({todo, form})