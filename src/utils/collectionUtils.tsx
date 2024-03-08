import {FolderEmojiIconProps, SchemasCollection} from "@/types/system";
import styles from "@/components/FilesPanel/src/FilesPanel.module.css";
import {Emoji, EmojiStyle} from "emoji-picker-react";
import React, { ReactElement, ReactNode } from "react";

export const convertToTreeData = (data: SchemasCollection[]): SchemasCollection[] => {
    return data.map((node) => {
        let newChildren = node.children ? convertToTreeData(node.children) : undefined;
        let newIcon: ReactNode | undefined = undefined;

        if (node.emoji) {
            newIcon = (
                <div className={styles.emojiIcon} data-unified={convertToUnifiedCode(node.emoji.code)}>
                    <Emoji unified={convertToUnifiedCode(node.emoji.code)} emojiStyle={EmojiStyle.APPLE} size={16}/>
                </div>
            );
        }

        return {
            ...node,           // Spread the original node properties.
            children: newChildren,
            icon: newIcon      // Override the icon with the new one.
        };
    });
};

export const convertToSchemaCollections = (data: SchemasCollection[]): SchemasCollection[] => {
    return data.map((node, index) => {
        let newChildren = node.children ? convertToSchemaCollections(node.children) : undefined;
        let newEmoji: FolderEmojiIconProps | undefined = undefined;

        if (node.icon && React.isValidElement(node.icon)) {
            const iconElement = node.icon as ReactElement;
            const unifiedCode = iconElement.props['data-unified'];

            // Convert the unified code back to the original format.
            const originalCode = convertFromUnifiedCode(unifiedCode);
            newEmoji = {
                code: originalCode,
                background: ''  // Note: You may need to provide an actual background value here.
            };
        }
        
        const { icon, ...nodeWithoutIcon } = node;

        return {
            ...nodeWithoutIcon,
            children: newChildren,
            emoji: newEmoji
        }
    });
};

export const convertToUnifiedCode = (code: string) => {
    const parts = code.split(' ');
    const unifiedParts = parts.map(part => part.replace('U+', '').toLowerCase()).filter(part => part.trim() !== '');
    return unifiedParts.join('-');
};

export const convertFromUnifiedCode = (unified: string) => {
    const parts = unified.split('-');
    const originalParts = parts.map(part => 'U+' + part.toUpperCase());
    return originalParts.join(' ');
};