import {CassettesParams} from "@/shared/types";
import {CSSProperties, FC} from "react";
import {NOMINAL_COLOR_ENUM} from "@/shared/consts";
import classes from "./cassette.module.scss";
import {serializeBillsCount, serializeNominal} from "@/shared/utils";

type Props = CassettesParams

const Cassette: FC<Props> = ({id, nominal, billsCount, status}) => {
    const cassetteStyle: CSSProperties & Record<string, string> = {
        backgroundColor: NOMINAL_COLOR_ENUM[`${nominal}rub`],
        boxShadow: `0 5px 10px ${NOMINAL_COLOR_ENUM[`${nominal}rub`]}`
    }

    const banknoteStyle: Record<string, string> = {
        '--banknote': `url(/${nominal}rub.png)`
    }

    return (
        <div style={cassetteStyle} className={`${classes.cassette} ${
            status === 'Неисправна' || billsCount === 0 ? classes['cassette--disabled'] : ''
        }`}>
            <div style={banknoteStyle}
                 className={classes.cassette__banknote + ' ' + classes['cassette__banknote--left']}/>
            <div style={banknoteStyle} className={classes.cassette__banknote}/>
            <div style={banknoteStyle}
                 className={classes.cassette__banknote + ' ' + classes['cassette__banknote--right']}/>
            <span>Кассета №{id+1}</span>
            <span>{serializeNominal(nominal)}</span>
            <span>{serializeBillsCount(billsCount)}</span>
            <span>{status}</span>
        </div>
    );
};

export default Cassette;