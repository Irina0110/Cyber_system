import {FC} from "react";
import './Badge.scss';

const CLASS = 'badge';

interface BadgeProps {
    label: string,
    value?: string | number
}
export const Badge:FC<BadgeProps> = ({value, label}) => {
    return(
        <div className={CLASS}>
           <span>{label}</span>
            {value !== null &&
                <>
                    <span>|</span>
                    <span>{value}</span>
                </>
            }
        </div>
    )
}
