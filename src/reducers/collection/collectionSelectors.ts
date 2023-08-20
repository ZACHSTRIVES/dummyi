import {Store} from "@/types/system";
import {convertToTreeData} from "@/utils/collectionUtils";


export const selectCollections = (state: Store) => {
    return convertToTreeData(state.collection.collections);
}
