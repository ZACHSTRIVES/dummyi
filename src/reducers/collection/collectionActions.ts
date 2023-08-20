import {ON_DROP_TREE_NODE} from "@/constants/actions";
import {SchemasCollection} from "@/types/system";

// on tree node drop
export const doDropTreeNode= (collections:SchemasCollection[]): any =>
    async dispatch => {
        // TODO: mapping
        dispatch({type: ON_DROP_TREE_NODE, payload: collections});
    };