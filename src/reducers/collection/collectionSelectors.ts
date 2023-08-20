import {RootState} from "@/types/system";
import {convertToTreeData} from "@/utils/collectionUtils";


export const selectCollections = (state: RootState) => {
    return convertToTreeData(state.collection.collections);
}
