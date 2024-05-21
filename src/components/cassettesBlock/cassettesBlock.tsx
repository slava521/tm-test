import {FC} from 'react';
import {CassettesParams} from "@/shared/types";
import Cassette from "@/components/ui/cassette/cassette";
import classes from "./cassettesBlock.module.scss";

type Props = {
    cassettes?: CassettesParams[];
    error?: string;
    title?: string;
}

const CassettesBlock: FC<Props> = ({cassettes, error, title = 'Кассеты:'}) => {
    return (
        <div className={classes.cassettesBlock}>
            {error
                ? <span>{error}</span>
                : !cassettes
                    ? <span>Задайте параметры кассет</span>
                    :<>
                        <h2>{title}</h2>
                        <div className={classes.cassettesBlock__cassettes}>
                            {[...cassettes].sort((a, b) =>
                                a.id - b.id
                            ).map(cassette =>
                                <Cassette
                                    key={cassette.id}
                                    id={cassette.id}
                                    nominal={cassette.nominal}
                                    billsCount={cassette.billsCount}
                                    status={cassette.status}
                                />
                            )}
                        </div>
                    </>
            }
        </div>
    );
};

export default CassettesBlock;