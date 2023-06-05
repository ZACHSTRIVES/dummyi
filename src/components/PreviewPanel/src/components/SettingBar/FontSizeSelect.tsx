import React from "react";
import {Select} from "@douyinfe/semi-ui";
import {IconFont} from "@douyinfe/semi-icons";
import {useDispatch, useSelector} from "react-redux";
import {doSetRawViewFontSize} from "@/reducers/preview/previewActions";
import {selectRawViewFontSize, selectRawViewLineWrap} from "@/reducers/preview/previewSelectors";


export type FontSizeSelectProps = {}

export const FontSizeSelect: React.FunctionComponent<FontSizeSelectProps> = ({...props}) => {
    const dispatch = useDispatch();

    // store
    const fontSize = useSelector(selectRawViewFontSize);

    // action
    const onChangeFontSize = (value) => {
        dispatch(doSetRawViewFontSize(value));
    }

    return (
        <div className={'margin-left-6'}>
            <Select
                prefix={<IconFont/>}
                value={fontSize}
                optionList={fontSizeSelectList}
                onChange={onChangeFontSize}
            />
        </div>
    )
}

const fontSizeSelectList = [
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
    {value: 13, label: '13'},
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'},
    {value: 18, label: '18'},
]

