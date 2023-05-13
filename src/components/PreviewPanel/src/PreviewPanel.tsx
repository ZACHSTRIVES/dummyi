import React from 'react';
import {RawPreviewer} from "@/components/PreviewPanel/src/components";

export type PreviewPanelProps = {}

export const PreviewPanel: React.FunctionComponent<PreviewPanelProps> = () => {
    return (
        <div>
            <RawPreviewer />
        </div>
    );
};

