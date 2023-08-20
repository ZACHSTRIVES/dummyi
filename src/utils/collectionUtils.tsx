import {SchemasCollection} from "@/types/system";
import styles from "@/components/FilesPanel/src/FilesPanel.module.css";
import {Emoji, EmojiStyle} from "emoji-picker-react";
import React from "react";


export const convertToTreeData = (data: SchemasCollection[]): SchemasCollection[] => {
    return data.map((node, index) => {
        if (node.children) {
            node.children = convertToTreeData(node.children);
        }

        if (node.emoji) {
            node.icon = <div className={styles.emojiIcon}>
                <Emoji unified={convertToUnifiedCode(node.emoji.code)} emojiStyle={EmojiStyle.APPLE} size={16}/>
            </div>
        }
        return node;
    });
};

export const convertToUnifiedCode = (code: string) => {
    const parts = code.split(' ');
    const unifiedParts = parts.map(part => part.replace('U+', '').toLowerCase()).filter(part => part.trim() !== '');
    return unifiedParts.join('-');
};