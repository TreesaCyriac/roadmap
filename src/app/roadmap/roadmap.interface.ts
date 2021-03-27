export interface IRowData {
    label: string;
    cardContent: ICardContent[];
}

export interface ICardContent {
    key: string,
    labels: string[],
    summary: string,
    description: string,
    est: number,
    estimation: number,
    dueDate: string,
    fromDate: string,
    toDate: string,
    initialDate: Date,
    issueType: string,
    backgroundColor: string
}