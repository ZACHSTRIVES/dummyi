import {combineReducers} from "redux";
import {Store, Action} from "@/types/system";

// reducers
import app from "@/reducers/app/appReducer";
import workspace from "@/reducers/workspace/workspaceReducer";
import preview from "@/reducers/preview/previewReducer";
import collection from "@/reducers/collection/collectionReducer";

const rootReducer = combineReducers({
    app,
    workspace,
    preview,
    collection
});


export default (state: Store, action: Action) => rootReducer(state, action);