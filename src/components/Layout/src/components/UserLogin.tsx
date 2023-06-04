import { Avatar, Button, Dropdown } from "@douyinfe/semi-ui";
import { IconExit } from '@douyinfe/semi-icons';
import { useState } from "react";

export type User = {
    id: string,
    name: string
};

export enum DropDownPosition {
    TopLeft = 'topLeft',
    Top = 'top',
    TopRight = 'topRight',
    LeftTop = 'leftTop',
    Left = 'left',
    LeftBottom = 'leftBottom',
    RightTop = 'rightTop',
    Right = 'right',
    RightBottom = 'rightBottom',
    BottomLeft = 'bottomLeft',
    Bottom = 'bottom',
    BottomRight = 'bottomRight'
}

export type UserLoginProps = {
    className?: string,
    user: User,
    onLogout?: () => void,
    dropDownPosition?: DropDownPosition
};

export const UserLogin: React.FunctionComponent<UserLoginProps> = ({ dropDownPosition = DropDownPosition.BottomLeft, onLogout, ...props }) => {
    return (
        <Dropdown
            trigger={'click'}
            position={dropDownPosition}
            render={
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <div className="flex w-100 items-center gap-2">
                            <Avatar size="small" className={props.className}>{props.user?.name?.charAt(0)}</Avatar>
                            {props.user?.name}
                        </div>                        
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Button
                            theme="borderless"
                            icon={<IconExit />}
                            className="nav-btn"
                            onClick={onLogout}
                        >
                            Logout
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            }
        >
            <Avatar size="default" className={props.className}>{props.user?.name?.charAt(0)}</Avatar>
        </Dropdown>

    )
}