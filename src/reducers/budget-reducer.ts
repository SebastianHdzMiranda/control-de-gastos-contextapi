// Types
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}}

export type BudgetState = {
    budget: number
}



// State Inicial
export const initialState: BudgetState = {
    budget: 0
}

// Reducer
export const budgetReducer = ( state = initialState, action:BudgetActions) => {

    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    return state;
}