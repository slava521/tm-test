'use client'

import CassettesForm from "@/components/cassettesForm/cassettesForm";
import MoneyCalculation from "@/components/moneyCalculation/moneyCalculation";
import {useState} from "react";
import {CassettesParams} from "@/shared/types";
import classes from "./page.module.scss";
import CassettesBlock from "@/components/cassettesBlock/cassettesBlock";

export default function Home() {
    const [cassettes, setCassettes] = useState<CassettesParams[]>()

    return (
        <main className={classes.page}>
            <h1>Симуляция банкомата</h1>
            <CassettesForm setCassettes={setCassettes}/>
            <CassettesBlock cassettes={cassettes}/>
            <MoneyCalculation cassettes={cassettes}/>
        </main>
    );
}
