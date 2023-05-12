import React from "react";
import {Button, Tooltip, Modal} from "@douyinfe/semi-ui";
import {IconDelete} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {ConfirmationModal} from "@/components/Modals";


export type EmptyPageButtonProps = {}

export const EmptyPageButton: React.FC<EmptyPageButtonProps> = () => {
    const intl = useIntl();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);

    // actions
    const handleEmptyPage = () => {
        // TODO: empty page
    }


    return (
        <>
            <Tooltip
                position={'bottom'}
                content={intl.formatMessage(
                    {id: "toolbar.emptyPageButton.tooltip"}
                )}>

                <Button
                    theme={"borderless"}
                    type='tertiary'
                    icon={<IconDelete size={'large'}/>}
                    onClick={() => setIsConfirmationModalOpen(true)}
                />

            </Tooltip>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                title={intl.formatMessage({id: 'toolbar.emptyPageButton.confirmation.title'})}
                content={intl.formatMessage({id: 'toolbar.emptyPageButton.confirmation.text'})}
                onConfirm={handleEmptyPage}
            />
        </>
    )
}