import React from 'react';
import {Descriptions, Divider, Progress, Typography} from "@douyinfe/semi-ui";
import styles from './ExportProgressDash.module.scss';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ColorMode} from "@/constants/enums";
import {FormattedMessage} from "@/locale";

export interface ExportProgressDashProps {
}

export const ExportProgressDash: React.FunctionComponent<ExportProgressDashProps> = () => {
    const {Numeral} = Typography;

    // selectors
    const colorMode = useSelector(selectColorMode);

    // parser
    function parserTCH(oldVal) {
        return oldVal.split(' ').map(item =>
            Number(item) ? `${item.replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')}` : item
        ).join(' ');
    }

    function parserTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds - minutes * 60;
        return `${minutes}:${secondsLeft}`;
    }

    return (
        <div className={styles.exportProgressDash}>
            <Progress percent={55} type="circle"
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
                        <Numeral parser={parserTCH} rule={'numbers'}>
                            643888
                        </Numeral>
                    </Descriptions.Item>

                    <Descriptions.Item itemKey={<FormattedMessage id={'export.modal.generating.time.text'}/>}>
                        <Numeral parser={parserTime} rule={'numbers'}>
                            647836
                        </Numeral>
                    </Descriptions.Item>
                </Descriptions>

                <div className={styles.exportDescription__sparkline}>
                    <Sparklines height={60} data={[5, 10, 5, 20, 5, 6, 12, 16, 7, 8, 34]}>
                        <SparklinesLine color={colorMode === ColorMode.LIGHT ? 'black' : 'white'}/>
                    </Sparklines>
                </div>
            </div>

        </div>
    )
}