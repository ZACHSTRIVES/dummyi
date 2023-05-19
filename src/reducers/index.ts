import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import app from "@/reducers/app/appReducer";
import exporter from "@/reducers/exporter/exporterReducer";
import workspace from "@/reducers/workspace/workspaceReducer";
import preview from "@/reducers/preview/previewReducer";

const rootReducer = combineReducers({
    app,
    exporter,
    workspace,
    preview
});


export default (state: Store, action: Action) => rootReducer(state, action);