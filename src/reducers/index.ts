import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import app from "@/reducers/app/appReducer";

const rootReducer = combineReducers({
    app
});


export default (state: Store, action: Action) => rootReducer(state, action);