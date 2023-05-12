import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import app from "@/reducers/app/appReducer";
import exporter from "@/reducers/exporter/exportReducer";
import workplace from "@/reducers/workplace/workplaceReducer";

const rootReducer = combineReducers({
    app,
    exporter,
    workplace,
});


export default (state: Store, action: Action) => rootReducer(state, action);