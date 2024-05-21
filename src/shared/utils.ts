import {CassettesParams} from "@/shared/types";

export const calculateMoney = (cassettes: CassettesParams[], moneyCount: number) => {
    const sortedCassettes = [...cassettes].filter(cassette =>
        cassette.status==='Исправна' && cassette.billsCount > 0
    ).sort((a, b) =>
        b.nominal - a.nominal
    )
    let i = 0
    const countedCassettes: CassettesParams[] = []
    let totalMoney = 0
    while (i < sortedCassettes.length && totalMoney!==moneyCount) {
        const {id, nominal, billsCount, status} = sortedCassettes[i]
        if (moneyCount - totalMoney >= nominal) {
            const tempBillsCount = Math.min(Math.floor((moneyCount - totalMoney) / nominal), billsCount)
            totalMoney += tempBillsCount * nominal
            countedCassettes.push({
                id,
                nominal,
                billsCount: tempBillsCount,
                status
            })
        }
        i++
    }
    return {
        error: totalMoney!==moneyCount ? 'Данную сумму невозможно набрать текущими кассетами':'',
        cassettes: countedCassettes
    }
}

export const serializeNominal = (nominal: number | string) =>
    nominal + ' рублей'

export const serializeBillsCount = (billsCount: number) => {
    const strBillCount = '' + billsCount
    const endNumber = +strBillCount[strBillCount.length-1]
    if (endNumber === 1) {
        return strBillCount + ' купюра'
    }
    else if (endNumber < 5 && endNumber !== 0) {
        return strBillCount + ' купюры'
    }
    else {
        return strBillCount + ' купюр'
    }
}