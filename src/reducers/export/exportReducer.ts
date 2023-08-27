import {Action, ExportReducerState} from "@/types/system";
import {
    ON_BATCH_GENERATE_COMPLETE,
    SET_EXPORT_FILE_NAME, SET_EXPORT_NOTIFICATION_ID,
    SET_EXPORT_PROCESS_STAGE,
    SET_SHOW_EXPORT_MODAL
} from "@/constants/actions";
import {ExportProcessStage} from "@/constants/enums";
import {DEFAULT_EXPORT_FILE_NAME} from "@/constants/config";

export const initStates: ExportReducerState = {
    showExportModal: false,
    exportFileName: DEFAULT_EXPORT_FILE_NAME,
    exportProcessStage: ExportProcessStage.PREVIEW,
    isCanceled: false,
    currentNumOfRowsGenerated: 0,
    sparkLineData: [0, 0, 0, 0, 0, 0, 0],
    formattedExportData: "",
    timeElapsed: 0,
    exportNotificationId: null
}

const exportReducer = (state: ExportReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_SHOW_EXPORT_MODAL:
            return {
                ...state,
                showExportModal: action.payload
            };
        case SET_EXPORT_FILE_NAME:
            return {
                ...state,
                exportFileName: action.payload
            };
        case SET_EXPORT_PROCESS_STAGE:
            return {
                ...state,
                exportProcessStage: action.payload
            };
        case ON_BATCH_GENERATE_COMPLETE:
            const newSparkLineData = [...state.sparkLineData, action.payload.batchTimeElapsed]; // 创建新的数组副本，包含新值
            return {
                ...state,
                currentNumOfRowsGenerated: action.payload.totalNumOfRowsGenerated,
                timeElapsed: action.payload.totalTimeElapsed,
                sparkLineData: newSparkLineData
            };
        case SET_EXPORT_NOTIFICATION_ID:
            return {
                ...state,
                exportNotificationId: action.payload
            };
        default:
            return state;
    }
};

export default exportReducer;
