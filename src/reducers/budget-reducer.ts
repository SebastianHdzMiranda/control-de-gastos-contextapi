import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';


// Types
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}}

export type BudgetState = {
    budget: number
    availableBudget: number
    modal: boolean
    expense: Expense[]
}



// State Inicial
export const initialState: BudgetState = {
    budget: 0,
    availableBudget: 0,
    modal: false,
    expense: []
}

/* Funcion que agrega un id 

    (expense: DraftExpense) : Expense

        Este bloque de codigo me expresa: el parametro expense es de tipo DraftExpense(sin id), pero quiero que al returnar la funcion sea de tipo Expense (con id)
*/
const createExpenceWithId = (expense: DraftExpense) : Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}

// Reducer
export const budgetReducer = ( state = initialState, action:BudgetActions) => {

    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget,
            availableBudget: action.payload.budget,
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: !state.modal
        }
    }

    if (action.type === "add-expense") {

        const expense = createExpenceWithId(action.payload.expense);

        return {
            ...state,
            availableBudget: state.availableBudget - action.payload.expense.amount,
            expense: [...state.expense, expense]
        }
    }

    return state;
}