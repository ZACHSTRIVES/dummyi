import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import app from "@/reducers/app/appReducer";
import exporter from "@/reducers/exporter/exportReducer";
import workspace from "@/reducers/workspace/workspaceReducer";

const rootReducer = combineReducers({
    app,
    exporter,
    workspace,
});


export default (state: Store, action: Action) => rootReducer(state, action);