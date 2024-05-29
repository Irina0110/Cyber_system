import {FC} from 'react';
import './Button.scss';
import {cn} from "@/lib/utils.ts";

const CLASS = 'button'

interface ButtonsProps {
    label: string,
    size: 'xs' | 's' | 'm',
    view?: 'system' | 'ghost',
    onClick?: () => void,
    type: 'submit' | 'button'
}

export const Button: FC<ButtonsProps> = ({label, view = 'system', size, onClick, type}) => {
    return (
        <button type={type}
                className={cn(CLASS, view === 'system' ? `${CLASS}--system` : `${CLASS}--ghost`, `${CLASS}--${size}`)}
                onClick={onClick}
        >
            {label}
        </button>
    )
}