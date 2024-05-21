'use client'

import {ChangeEvent, FC, FormEvent, useState} from "react";
import Input from "@/components/ui/input/input";
import classes from "./cassettesForm.module.scss";
import {CASSETTE_STATUSES, NOMINALS} from "@/shared/consts";
import Button from "@/components/ui/button/button";
import {CassetteNominals, CassettesParams, CassetteStatuses} from "@/shared/types";
import {serializeNominal} from "@/shared/utils";

type Props = {
    setCassettes: (cassettes:CassettesParams[])=>void
}

const CassettesForm: FC<Props> = ({setCassettes}) => {
    const [cassetteCount, setCassetteCount] = useState<number>(1)

    const cassettes = []

    for (let i = 1; i<=cassetteCount; i++) {
        cassettes.push(i)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const cassettesParams: CassettesParams[] = []
        for (let i = 1; i<=cassetteCount; i++) {
            const nominal = Number(formData.get(`cassetteNominal${i}`)) as CassetteNominals
            const billsCount = Number(formData.get(`cassetteBillsCount${i}`))
            const status = formData.get(`cassetteStatus${i}`) as CassetteStatuses
            cassettesParams.push({
                id: i,
                nominal,
                billsCount,
                status
            })
        }
        setCassettes(cassettesParams);
    }

    const handleCassetteCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const inputValue = +event.currentTarget.value
        setCassetteCount(Math.min(Math.max(inputValue, 1), 8))
    }

    return (
        <form className={classes.cassettesForm} onSubmit={handleSubmit}>
            <Input
                type='select'
                onSelectChange={handleCassetteCountChange}
                defaultValue={cassetteCount}
                selectOptions={[1,2,3,4,5,6,7,8]}
                name='cassetteCount'
                label='Кол-во кассет:'
            />
            <div className={classes.cassettesForm__params}>
                <div className={classes.cassettesForm__columns}>
                    <div className={classes.cassettesForm__columns__column}>
                        <label className={classes.cassettesForm__label}>Номинал:</label>
                    </div>
                    <div className={classes.cassettesForm__columns__column}>
                        <label className={classes.cassettesForm__label}>Кол-во купюр:</label>
                    </div>
                    <div className={classes.cassettesForm__columns__column}>
                        <label className={classes.cassettesForm__label}>Исправность:</label>
                    </div>
                </div>
                <div className={classes.cassettesForm__columns}>
                    <div className={classes.cassettesForm__columns__column}>
                        {cassettes.map((key) =>
                            <Input
                                key={key}
                                type='select'
                                selectOptions={NOMINALS}
                                serializeOptions={serializeNominal}
                                name={'cassetteNominal' + key}
                            />
                        )}
                    </div>
                    <div className={classes.cassettesForm__columns__column}>
                        {cassettes.map((key) =>
                            <Input
                                key={key}
                                type='number'
                                min={0}
                                max={5000}
                                defaultValue={1}
                                name={'cassetteBillsCount' + key}
                            />
                        )}
                    </div>
                    <div className={classes.cassettesForm__columns__column}>
                        {cassettes.map((key) =>
                            <Input
                                key={key}
                                type='select'
                                selectOptions={CASSETTE_STATUSES}
                                name={'cassetteStatus' + key}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Button value={'Записать'}/>
        </form>
    );
};

export default CassettesForm;