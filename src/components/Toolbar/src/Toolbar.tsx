import React, {useEffect, useRef} from "react";
import {Button, Col, Divider, Popover, Row} from "@douyinfe/semi-ui";
import Styles from './Toolbar.module.css';
import {IconMore} from "@douyinfe/semi-icons";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";
import {GenerateButton} from "@/components/Toolbar/src/components/GenerateButton";
import {PanelsOrientationButton} from "@/components/Toolbar/src/components/PanelsOrientationButton";
import {EmptyPageButton} from "@/components/Toolbar/src/components/EmptyPageButton";
import {ImportSchemaButton} from "@/components/Toolbar/src/components/ImportSchemaButton";
import {ExportSchemaButton} from "@/components/Toolbar/src/components/ExportSchemaButton";
import {ComponentSize} from "@/constents/enums";
import {ConfirmationModal} from "@/components/Modals";
import {useIntl} from "@/locale";


export type ToolbarProps = {}

export const Toolbar: React.FC<ToolbarProps> = () => {
    const intl = useIntl();
    const containerRef = useRef<HTMLDivElement>(null);
    const [showMoreButton, setShowMoreButton] = React.useState(false);
    const [componentsSize, setComponentsSize] = React.useState(ComponentSize.LARGE);
    const [isEmptyPageConfirmationModalOpen, setIsEmptyPageConfirmationModalOpen] = React.useState(false);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerWidth = entries[0].contentRect.width;

            if (containerWidth < 460) {
                setShowMoreButton(true);
            } else {
                setShowMoreButton(false);
            }

            if (containerWidth < 360) {
                setComponentsSize(ComponentSize.SMALL);
            } else {
                setComponentsSize(ComponentSize.LARGE);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    function handleEmptyPage() {
        // TODO: empty page
    }

    return (
        <div ref={containerRef} className={Styles.toolbar}>
            <Row type={'flex'} justify={'space-between'}>
                <Col>
                    <Row type={'flex'} justify={'space-between'}>
                        <Button theme='light' style={{marginRight: 8, width: "70px"}}>SQL</Button>
                        <Divider layout={'vertical'} style={{height: "32px"}}/>

                        {showMoreButton ?
                            <Popover
                                trigger="click"
                                content={
                                    <>
                                        <ImportSchemaButton/>
                                        <ExportSchemaButton/>
                                        <EmptyPageButton onClick={() => {
                                            setIsEmptyPageConfirmationModalOpen(true)
                                        }}/>
                                        {window.innerWidth < 700 ? null : <PanelsOrientationButton/>}
                                    </>
                                }>
                                <Button theme={"borderless"} type='tertiary'
                                        icon={<IconMore size={'large'}/>}/>
                            </Popover> :
                            <div>
                                <ImportSchemaButton/>
                                <ExportSchemaButton/>
                                <EmptyPageButton onClick={() => {
                                    setIsEmptyPageConfirmationModalOpen(true)
                                }}/>
                                <PanelsOrientationButton/>
                            </div>}
                    </Row>
                </Col>

                <Col>
                    <NumbOfRowInput size={componentsSize}/>
                    <GenerateButton size={componentsSize}/>
                </Col>
            </Row>

            <ConfirmationModal
                isOpen={isEmptyPageConfirmationModalOpen}
                onClose={() => setIsEmptyPageConfirmationModalOpen(false)}
                title={intl.formatMessage({id: 'toolbar.emptyPageButton.confirmation.title'})}
                content={intl.formatMessage({id: 'toolbar.emptyPageButton.confirmation.text'})}
                onConfirm={handleEmptyPage}
            />

        </div>
    )
}