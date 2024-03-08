import React from "react";
import {Button, Icon, Tag, Typography} from "@douyinfe/semi-ui";
import {IconSlash} from "@/components/Icons";
import styles from './SchemaSelector.module.scss'
import {ColorMode} from "@/constants/enums";
import {useSelector} from "react-redux";
import {RootState} from "@/types/system";
import {IconChevronUpDown} from "@douyinfe/semi-icons";
import {Emoji, EmojiStyle} from 'emoji-picker-react';
import {convertToUnifiedCode} from "@/utils/collectionUtils";


export interface SchemaSelectorProps {
}

export const SchemaSelector: React.FunctionComponent<SchemaSelectorProps> = () => {

    // store
    const colorMode = useSelector((state: RootState) => state.app.colorMode);
    const {Text} = Typography;

    return <div className={styles.schemaSelector}>
        <Icon svg={<IconSlash/>} size={"extra-large"} style={{color: 'gray'}}/>

        <div className={styles.schemaSelectorTag}>
            <div className={styles.schemaSelectorTagIcon}>
                <div>
                    <Emoji unified={convertToUnifiedCode('U+1F4C4')} emojiStyle={EmojiStyle.APPLE} size={15}/>
                </div>
            </div>
            <div>
                <Text size={'normal'} aria-readonly>
                    Untitled Schema
                </Text>
            </div>
        </div>

        <Button
            className={styles.schemaSelectorButton}
            theme='borderless'
            icon={<IconChevronUpDown size={'default'}/>}>
        </Button>
    </div>
}
