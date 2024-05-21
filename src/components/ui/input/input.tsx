'use client'

import {DetailedHTMLProps, FC, HTMLInputTypeAttribute, InputHTMLAttributes, useId} from "react";
import classes from "./input.module.scss";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    type: HTMLInputTypeAttribute | 'select';
    label?: string;
    selectOptions?: (number | string)[];
    serializeOptions?: (option: number | string) => number | string
}

const Input: FC<Props> = (
    {
        type,
        label,
        selectOptions,
        serializeOptions,
        ...rest
    }) => {
    const id = useId()

    return (
        <div className={classes.input}>
            {label &&
                <label htmlFor={id} className={classes.input__label}>{label}</label>
            }
            {type!=='select'
                ? <input
                    id={id}
                    className={classes.input__field}
                    type={type}
                    {...rest}
                />
                : <select id={id} className={classes.input__field} name={rest.name}>
                    {selectOptions && selectOptions.map(selectOption =>
                        <option key={selectOption} value={selectOption}>
                            {serializeOptions
                                ? serializeOptions(selectOption)
                                : selectOption
                            }
                        </option>
                    )}
                </select>
            }
        </div>
    );
};

export default Input;