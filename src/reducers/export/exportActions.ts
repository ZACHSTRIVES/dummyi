import {
    ON_BATCH_GENERATE_COMPLETE,
    SET_EXPORT_FILE_NAME,
    SET_EXPORT_PROCESS_STAGE,
    SET_SHOW_EXPORT_MODAL
} from "@/constants/actions";
import {ExportProcessStage} from "@/constants/enums";
import {GenerateDataBatchCompletedCallbackResponse} from "@/types/generator";

// set show export modal
export const doSetShowExportModal = (show: boolean): any =>
    async dispatch => {
        dispatch({type: SET_SHOW_EXPORT_MODAL, payload: show});
    };

// set export file name
export const doSetExportFileName = (fileName: string): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_FILE_NAME, payload: fileName});
    };

// set export process stage
export const doSetExportProcessStage = (stage: ExportProcessStage): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_PROCESS_STAGE, payload: stage});
    };

// on batch complete
export const doOnBatchComplete = (response: GenerateDataBatchCompletedCallbackResponse): any =>
    async dispatch => {
        dispatch({type: ON_BATCH_GENERATE_COMPLETE, payload: response});
    };
