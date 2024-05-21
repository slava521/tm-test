'use client'

import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import {ChangeEvent, FC, FormEvent, useEffect, useId, useState} from "react";
import {calculateMoney} from "@/shared/utils";
import {CassettesParams} from "@/shared/types";
import classes from "./moneyCalculation.module.scss";
import CassettesBlock from "@/components/cassettesBlock/cassettesBlock";

type Props = {
    cassettes?: CassettesParams[]
}

const MoneyCalculation: FC<Props> = ({cassettes}) => {
    const [moneyCount, setMoneyCount] = useState(100)
    const [error, setError] = useState('')
    const [calculationResult, setCalculationResult] = useState<CassettesParams[]>()
    const [calculationTiming, setCalculationTiming] = useState('')
    const id = useId()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setMoneyCount(+(event.currentTarget.value))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setError('')
        if (!cassettes) {
            setError('Сначала задайте параметры кассет!')
            return
        }
        const timeStart = performance.now()
        const result = calculateMoney(cassettes, moneyCount)

        const timeEnd = performance.now()
        if (result.error) {
            setError(result.error)
        } else {
            setCalculationResult(result.cassettes)
        }
        setCalculationTiming((timeEnd - timeStart).toFixed(2))
    }

    useEffect(() => {
        const resultBlock = document.getElementById(id)
        resultBlock?.scrollIntoView({block: 'center', behavior: 'smooth'})
    }, [calculationResult, error]);

    return (
        <div className={classes.calculation}>
            <form onSubmit={handleSubmit} className={classes.calculation__form}>
                <Input
                    name='money'
                    type='number'
                    onChange={handleChange}
                    min={100}
                    max={200000000}
                    step={100}
                    label={'Введите сумму, кратную 100, которую необходимо набрать (руб.)'}
                    defaultValue={moneyCount}
                />
                <Button value='Рассчитать' disabled={!cassettes}/>
            </form>
            {(calculationResult || error) &&
                <div>
                    <CassettesBlock cassettes={calculationResult} error={error} title={'Необходимые кассеты:'}/>
                    <div id={id} className={classes.calculation__result_time}>
                        Расчет занял {calculationTiming} ms
                    </div>
                </div>
            }
        </div>
    );
};

export default MoneyCalculation;