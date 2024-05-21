export type CassetteNominals = 100 | 200 | 500 | 1000 | 2000 | 5000

export type CassetteStatuses = 'Исправна' | 'Неисправна'

export type CassettesParams = {
    id: number;
    nominal: CassetteNominals;
    billsCount: number;
    status: CassetteStatuses;
}