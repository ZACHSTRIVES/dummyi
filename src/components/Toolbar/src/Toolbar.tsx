import React from "react";
import {Button, Col, Row} from "@douyinfe/semi-ui";
import Styles from './Toolbar.module.css';
import {IconMore, IconSave, IconSetting} from "@douyinfe/semi-icons";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";
import {GenerateButton} from "@/components/Toolbar/src/components/GenerateButton";
import {PanelDirectionButton} from "@/components/Toolbar/src/components/PanelDirectionButton";
import {EmptyPageButton} from "@/components/Toolbar/src/components/EmptyPageButton";


export type ToolbarProps = {}

export const Toolbar: React.FC<ToolbarProps> = () => {
    return (
        <div className={Styles.toolbar}>
            <Row type={'flex'} justify={'space-between'}>
                <Col>
                    <Button theme='light'  style={{ marginRight: 8, width:"80px" }}>SQL</Button>
                    <EmptyPageButton/>
                    <PanelDirectionButton/>
                </Col>

                <Col>
                    <NumbOfRowInput/>
                    <GenerateButton/>
                </Col>

            </Row>

        </div>
    )
}