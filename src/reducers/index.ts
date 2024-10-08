import {combineReducers} from "redux";
import storage from "@/store/storage";

// reducers
import {persistReducer} from "redux-persist";
import app from "@/reducers/app/appReducer";
import workspace from "@/reducers/workspace/workspaceReducer";
import preview from "@/reducers/preview/previewReducer";
import collection from "@/reducers/collection/collectionReducer";
import exportReducer from "@/reducers/export/exportReducer";

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

const exportPersistConfig = {
    key: 'export',
    storage: storage,
    blacklist: ['exportProcessStage',
        'exportFileName',
        'exportProcessStage',
        'currentNumOfRowsGenerated',
        'sparkLineData',
        'timeElapsed'
    ]
}

const collectionPersistConfig = {
    key: 'collection',
    storage: storage
}

const rootReducer = combineReducers({
    app: persistReducer(appPersistConfig, app),
    workspace: persistReducer(workspacePersistConfig, workspace),
    preview: persistReducer(previewPersistConfig, preview),
    export: persistReducer(exportPersistConfig, exportReducer),
    collection: persistReducer(collectionPersistConfig, collection),
});


export default rootReducer;