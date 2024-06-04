// Types
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'}

export type BudgetState = {
    budget: number
    modal: boolean
}



// State Inicial
export const initialState: BudgetState = {
    budget: 0,
    modal: false
}

// Reducer
export const budgetReducer = ( state = initialState, action:BudgetActions) => {

    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: !state.modal
        }
    }

    return state;
}