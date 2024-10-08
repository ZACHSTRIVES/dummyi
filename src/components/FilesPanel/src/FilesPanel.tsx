import {Tree} from '@douyinfe/semi-ui';
import React, {} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCollections} from "@/reducers/collection/collectionSelectors";
import { doDropTreeNode } from '@/reducers/collection/collectionActions';
import { cloneDeep } from 'lodash';

export const FilesPanel: React.FunctionComponent = () => {

    // state
    const collections = useSelector(selectCollections);
    const dispatch = useDispatch();

    const onDrop = (info) => {
        const {dropToGap, node, dragNode} = info;
        const dropKey = node.key;
        const dragKey = dragNode.key;
        const dropPos = node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const data = cloneDeep(collections);
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) return callback(item, index, arr);
                if (item.children) return loop(item.children, key, callback);
            });
        };

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!dropToGap) {
            // inset into the dropPosition
            loop(data, dropKey, (item, ind, arr) => {
                item.children = item.children || [];
                item.children.push(dragObj);
            });
        } else if (dropPosition === 1 && node.children && node.expanded) {
            // has children && expanded and drop into the node bottom gap
            // could insert anywhere. Here we insert to the top.
            loop(data, dropKey, item => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else {
            let dropNodeInd;
            let dropNodePosArr;
            loop(data, dropKey, (item, ind, arr) => {
                dropNodePosArr = arr;
                dropNodeInd = ind;
            });
            if (dropPosition === -1) {
                // insert to top
                dropNodePosArr.splice(dropNodeInd, 0, dragObj);
            } else {
                // insert to bottom
                dropNodePosArr.splice(dropNodeInd + 1, 0, dragObj);
            }
        }

        dispatch(doDropTreeNode(data));
    }

    return (
        <Tree
            treeData={collections}
            directory
            draggable
            onDrop={onDrop}
        />
    );
}