import React from "react";
import {Modal} from "@douyinfe/semi-ui";
import {IconAlertTriangle} from "@douyinfe/semi-icons";
import styles from './ConfirmationModal.module.css';

export interface ConfirmationModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    content: string,
    onConfirm?: () => void,
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
    const {title, content, onConfirm, onClose, isOpen} = props;

    return (
        <Modal
            icon={<IconAlertTriangle size={'large'}/>}
            title={title}
            visible={isOpen}
            onCancel={onClose}
            onOk={onConfirm}
            style={{width: '90vw', maxWidth: '600px'}}
        >
            {content}
        </Modal>
    )
}