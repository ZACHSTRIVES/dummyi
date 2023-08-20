import {ON_DROP_TREE_NODE} from "@/constants/actions";
import {SchemasCollection} from "@/types/system";
import { convertToSchemaCollections } from "@/utils/collectionUtils";

// on tree node drop
export const doDropTreeNode= (collections:SchemasCollection[]): any =>
    async dispatch => {
        const payload = convertToSchemaCollections(collections);
        dispatch({type: ON_DROP_TREE_NODE, payload: payload});
    };