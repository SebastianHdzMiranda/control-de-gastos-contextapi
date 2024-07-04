import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';


// Types
export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal'} |
    { type: 'add-expense', payload: {expense: DraftExpense} } |
    { type: 'remove-expense', payload: {id: Expense['id']} } |
    { type: 'get-expense-by-id', payload: {id: Expense['id']} } |
    { type: 'update-expense', payload: {expense: Expense } }

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
}

// LocalStorage
const localStorageBudget = () : number => {
    const budget = localStorage.getItem('budget');
    return budget ? JSON.parse(budget) : 0;
}
const localStorageExpense = () : Expense[] => {
    const expense = localStorage.getItem('expense');
    return expense ? JSON.parse(expense) : [];
}

// State Inicial
export const initialState: BudgetState = {
    budget: localStorageBudget(),
    modal: false,
    expense: localStorageExpense(),
    editingId: '',
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
        localStorage.setItem( 'budget', JSON.stringify(action.payload.budget));
        return {
            ...state,
            budget: action.payload.budget,
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: !state.modal,
            editingId: '',
        }
    }

    if (action.type === "add-expense") {

        const expense = createExpenceWithId(action.payload.expense);
        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false,
        }
    }

    if (action.type === 'remove-expense') {
        
        return {
            ...state,
            expense: state.expense.filter( expense => expense.id !== action.payload.id),
        }
    }

    if (action.type === 'get-expense-by-id') {
        
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        }
    }

    if (action.type === "update-expense") {
        
        return {
            ...state, 
            expense: state.expense.map( expense => expense.id === action.payload.expense.id ? action.payload.expense : expense ),
            editingId: '',
            modal: false,
        }
    }


    return state;
}