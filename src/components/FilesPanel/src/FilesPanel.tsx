import {Tree} from '@douyinfe/semi-ui';
import React from 'react';

import styles from "./FilesPanel.module.css";

export type TreeNode = {
    label: string;
    value: string;
    key: string;
    children?: TreeNode[];
};

export type FilesPanelProps = {
    files: { label: string; children?: FilesPanelProps['files'] }[];
};

export const FilesPanel: React.FunctionComponent<FilesPanelProps> = ({files}) => {
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

            return treeNode;
        });
    };

    const treeData = convertToTreeData(files, '');

    return (
        <Tree
            treeData={treeData}
            directory
        />
    );
}