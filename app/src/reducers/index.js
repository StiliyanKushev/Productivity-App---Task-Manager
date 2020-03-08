import {combineReducers} from "redux";

import navReducer from "./navReducer";
import scheduleReducer from "./scheduleReducer";

export default combineReducers({
    nav: navReducer,
    schedule: scheduleReducer
});