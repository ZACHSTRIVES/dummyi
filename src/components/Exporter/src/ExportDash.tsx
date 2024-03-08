import React from 'react';
import {Descriptions, Divider, Progress, Typography} from "@douyinfe/semi-ui";
import styles from './ExportDash.module.scss';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ColorMode, ExportProcessStage} from "@/constants/enums";
import {FormattedMessage} from "@/locale";
import {parseTCH, parseTimeCount} from "@/utils/stringUtils";

export interface ExportProgressDashProps {
    exportStage: ExportProcessStage;
    exportRows: number;
    currentExportedRows: number;
    sparkLineData: number[];
    timeElapsed: number;
}

export const ExportDash: React.FunctionComponent<ExportProgressDashProps> = ({...props}) => {
    const {exportStage, exportRows, currentExportedRows, sparkLineData, timeElapsed} = props;
    const {Numeral} = Typography;

    // percent
    let percent = currentExportedRows / exportRows;

    // selectors
    const colorMode = useSelector(selectColorMode);

    return (
        <div className={styles.exportProgressDash}>
            <Progress percent={percent * 100} type="circle"
                      width={120}
                      className={styles.exportProgress}
                      strokeWidth={8}
                      showInfo={true}
                      stroke={'var(--semi-color-secondary-active)'}
                      aria-label="progress circle"
                      format={per => {
                          return percent === 1 ?
                              <div className={styles.exportProgress__percent}>
                                  <FormattedMessage id={'export.modal.generating.done.text'}></FormattedMessage>
                              </div> :
                              <Numeral className={styles.exportProgress__percent} rule="percentages" precision={2}>
                                  {percent}
                              </Numeral>
                      }}
            />

            <Divider layout={'vertical'} className={styles.divider}/>

            <div className={`${styles.exportDescription} no-select-area`}>
                <div>
                    <Descriptions align={'left'} size={'small'}>
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
                </div>
                <div className={styles.exportDescription__sparkline}>
                    <Sparklines
                        height={60}
                        data={sparkLineData}
                        limit={exportStage === ExportProcessStage.COMPLETED ? null :
                            Math.min(sparkLineData.length, 10)}
                    >
                        <SparklinesLine color={colorMode === ColorMode.LIGHT ? 'black' : 'white'}/>
                    </Sparklines>
                </div>
            </div>

        </div>
    )
}