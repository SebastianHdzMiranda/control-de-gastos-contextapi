export type Category = {
    id: string
    name: string
    icon: string
}

export type Expense = {
    id: string
    name: string
    amount: number
    category: string
    date: Value
}

// gasto temporal
export type DraftExpense = Omit<Expense, 'id'>


// Types de libreria react-date-picker
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
