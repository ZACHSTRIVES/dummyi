import React from "react";
import {Button, Col, Divider, Popover, Row} from "@douyinfe/semi-ui";
import Styles from './Toolbar.module.css';
import {IconMore} from "@douyinfe/semi-icons";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";
import {GenerateButton} from "@/components/Toolbar/src/components/GenerateButton";
import {PanelsOrientationButton} from "@/components/Toolbar/src/components/PanelsOrientationButton";
import {EmptyPageButton} from "@/components/Toolbar/src/components/EmptyPageButton";
import {ImportSchemaButton} from "@/components/Toolbar/src/components/ImportSchemaButton";
import {ExportSchemaButton} from "@/components/Toolbar/src/components/ExportSchemaButton";


export type ToolbarProps = {}

export const Toolbar: React.FC<ToolbarProps> = () => {
    return (
        <div className={Styles.toolbar}>
            <Row type={'flex'} justify={'space-between'}>
                <Col>
                    <Row type={'flex'} justify={'space-between'}>
                        <Button theme='light' style={{marginRight: 8, width: "80px"}}>SQL</Button>

                        <Divider layout={'vertical'} style={{height: "32px"}}/>

                        <Popover
                            trigger="click"
                            content={
                                <>
                                    <ImportSchemaButton/>
                                    <ExportSchemaButton/>
                                    <EmptyPageButton/>
                                    <PanelsOrientationButton/>
                                </>
                            }>
                            <Button className={Styles.moreButton} theme={"borderless"} type='tertiary'
                                    icon={<IconMore size={'large'}/>}/>
                        </Popover>

                        <div className={Styles.toolbarItem}>
                            <ImportSchemaButton/>
                            <ExportSchemaButton/>
                            <EmptyPageButton/>
                            <PanelsOrientationButton/>
                        </div>

                    </Row>
                </Col>

                <Col>
                    <NumbOfRowInput/>
                    <GenerateButton/>
                </Col>
            </Row>
        </div>
    )
}