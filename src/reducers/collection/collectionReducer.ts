import {Action, CollectionReducerState} from "@/types/system";
import {mockCollections} from "@/reducers/mock";
import {ON_DROP_TREE_NODE} from "@/constants/actions";

export const initStates: CollectionReducerState = {
    collections: mockCollections
}

export default (state: CollectionReducerState = initStates, action: Action) => {
    switch (action.type) {
        case ON_DROP_TREE_NODE:
            return {
                ...state,
                collections: action.payload
            };
        default:
            return state;
    }
}