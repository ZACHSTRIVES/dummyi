import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { IconExit, IconUser } from '@douyinfe/semi-icons';
import styles from './UserLogin.module.css';

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
            className={styles.dropDown}
            trigger={'click'}
            position={dropDownPosition}
            render={
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <div className="flex w-100 items-center gap-2">
                            <Avatar size="small" className={props.className}>{props.user?.name?.charAt(0)}</Avatar>
                            <div className="flex flex-column">
                                <span className={`text-2 bold`}>{props.user?.name}</span>
                                <span className={`text-2`}>{props.user?.id}</span>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-2" icon={<IconUser />}>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={onLogout} className="text-2" icon={<IconExit />}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            }
        >
            <Avatar size="default" className={props.className}>{props.user?.name?.charAt(0)}</Avatar>
        </Dropdown>

    )
}