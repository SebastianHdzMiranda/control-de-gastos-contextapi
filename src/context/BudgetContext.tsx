import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer";

// Types
type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

/*
    En los children de un provider lo mas usual es usar ReactNode
*/
type BudgetProviderProps = {
    children: ReactNode
}


// Definir Context
/*
    Codigo un poco confuso.
        Al typear un context para quitar errores de Ts, se le puede asignar un null!
        para asegurar que los datos que se le pasaran seran a los esperados ( en este caso a un BudgetContextProps)
    
*/
export const BudgetContext = createContext<BudgetContextProps>(null!);

// Definir Provider
export const BudgetProvider = ({children}: BudgetProviderProps) => {
    // Definir useReducer
    const [ state, dispatch] = useReducer( budgetReducer, initialState);


    return (
        <BudgetContext.Provider value={{state, dispatch}}>
            {children}
        </BudgetContext.Provider>
    )
}