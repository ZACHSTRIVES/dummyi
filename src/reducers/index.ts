import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import settings from "./settings";

const rootReducer = combineReducers({
    settings
});


export default (state: Store, action: Action) => rootReducer(state, action);