import React from 'react';
import {Descriptions, Divider, Progress, Typography} from "@douyinfe/semi-ui";
import styles from './ExportProgressDash.module.scss';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ColorMode} from "@/constants/enums";
import {FormattedMessage} from "@/locale";
import {parseTCH, parseTimeCount} from "@/utils/stringUtils";
import {selectCurrentNumOfRowsGenerated} from "@/reducers/export/exportSelectors";

export interface ExportProgressDashProps {
    exportRows: number;
    currentExportedRows: number;
    sparkLineData: number[];
    timeElapsed: number;
}

export const ExportProgressDash: React.FunctionComponent<ExportProgressDashProps> = ({...props}) => {
    const {exportRows, currentExportedRows, sparkLineData, timeElapsed} = props;
    const {Numeral} = Typography;

    // selectors
    const colorMode = useSelector(selectColorMode);
    const r = useSelector(selectCurrentNumOfRowsGenerated);
    const percent = r / exportRows * 100;



    return (
        <div className={styles.exportProgressDash}>
            <Progress percent={percent} type="circle"
                      width={120}
                      className={styles.exportProgress}
                      strokeWidth={8}
                      showInfo={true}
                      stroke={'var(--semi-color-secondary-active)'}
                      aria-label="progress circle"
                      format={per =>
                          <div className={styles.exportProgress__percent}>
                              {per} %
                          </div>
                      }
            />

            <Divider layout={'vertical'} className={styles.divider}/>

            <div className={`${styles.exportDescription} no-select-area`}>
                <Descriptions align="center" row size={'small'}>
                    <Descriptions.Item itemKey={<FormattedMessage id={'export.modal.generating.rows.text'}/>}>
                        <Numeral parser={parseTCH} rule={'numbers'}>
                            {currentExportedRows}
                        </Numeral>
                    </Descriptions.Item>

                    <Descriptions.Item itemKey={<FormattedMessage id={'export.modal.generating.time.text'}/>}>
                        <Numeral parser={parseTimeCount} rule={'numbers'}>
                            {timeElapsed}
                        </Numeral>
                    </Descriptions.Item>
                </Descriptions>

                <div className={styles.exportDescription__sparkline}>
                    <Sparklines height={60} data={sparkLineData}>
                        <SparklinesLine color={colorMode === ColorMode.LIGHT ? 'black' : 'white'}/>
                    </Sparklines>
                </div>
            </div>

        </div>
    )
}