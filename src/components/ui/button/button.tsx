import {FC} from "react";
import classes from "./button.module.scss";

type Props = {
    value: string;
    disabled?: boolean;
}

const Button: FC<Props> = ({value, disabled}) => {
    return (
        <input
            type='submit'
            value={value}
            className={`${classes.button} ${
                disabled ? classes['button--disabled'] : ''
            }`}
            disabled={disabled}
        />
    );
};

export default Button;