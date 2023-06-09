import {combineReducers} from "redux";
import {RootState, Action} from "@/types/system";
import storage from "@/store/storage";

// reducers
import app from "@/reducers/app/appReducer";
import workspace from "@/reducers/workspace/workspaceReducer";
import preview from "@/reducers/preview/previewReducer";
import {persistReducer} from "redux-persist";

// persist
const appPersistConfig = {
    key: 'app',
    storage: storage
}

const workspacePersistConfig = {
    key: 'workspace',
    storage: storage
}

const previewPersistConfig = {
    key: 'preview',
    storage: storage
}

const rootReducer = combineReducers({
    app: persistReducer(appPersistConfig, app),
    workspace: persistReducer(workspacePersistConfig, workspace),
    preview: persistReducer(previewPersistConfig, preview)
});


export default rootReducer;