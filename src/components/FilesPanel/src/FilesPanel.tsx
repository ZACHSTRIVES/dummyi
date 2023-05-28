import { Tree } from '@douyinfe/semi-ui';
import React, { ReactNode, useState } from 'react';

import styles from "./FilesPanel.module.css";
import { Emoji, EmojiStyle } from 'emoji-picker-react';

export type TreeNode = {
    label: string;
    value: string;
    icon?: ReactNode;
    key: string;
    children?: TreeNode[];
};

export type FilesPanelProps = {
    files: {
        label: string;
        emoji?: {
            background: string;
            code: string;
        }
        children?: FilesPanelProps['files']
    }[];
};

export const convertToUnifiedCode = (code: string) => {
    const parts = code.split(' ');
    const unifiedParts = parts.map(part => part.replace('U+', '').toLowerCase()).filter(part => part.trim() !== '');
    return unifiedParts.join('-');
};

export const FilesPanel: React.FunctionComponent<FilesPanelProps> = ({ files }) => {
    const convertToTreeData = (data: FilesPanelProps['files'], parentKey: string): TreeNode[] => {
        return data.map((node, index) => {
            const key = parentKey ? `${parentKey}-${index}` : `${index}`;
            const treeNode: TreeNode = {
                label: node.label,
                value: node.label,
                key: key
            };

            if (node.children) {
                treeNode.children = convertToTreeData(node.children, key);
            }

            if (node.emoji) {
                console.log(convertToUnifiedCode(node.emoji.code));
                treeNode.icon = <div className={styles.emojiIcon}><Emoji unified={convertToUnifiedCode(node.emoji.code)} emojiStyle={EmojiStyle.APPLE} size={16} /></div>
            }

            return treeNode;
        });
    };

    const initTreeData = convertToTreeData(files, '');

    const [treeData, setTreeData] = useState(initTreeData);

    const onDrop = (info) => {
        const { dropToGap, node, dragNode } = info;
        const dropKey = node.key;
        const dragKey = dragNode.key;
        const dropPos = node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const data = [...treeData];
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
        }
        else if (dropPosition === 1 && node.children && node.expanded) {
            // has children && expanded and drop into the node bottom gap
            // could insert anywhere. Here we insert to the top.
            loop(data, dropKey, item => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        }
        else {
            let dropNodeInd;
            let dropNodePosArr;
            loop(data, dropKey, (item, ind, arr) => {
                dropNodePosArr = arr;
                dropNodeInd = ind;
            });
            if (dropPosition === -1) {
                // insert to top
                dropNodePosArr.splice(dropNodeInd, 0, dragObj);
            }
            else {
                // insert to bottom
                dropNodePosArr.splice(dropNodeInd + 1, 0, dragObj);
            }
        }
        setTreeData(data);
    }

    return (
        <Tree
            treeData={treeData}
            directory
            draggable
            onDrop={onDrop}
        />
    );
}