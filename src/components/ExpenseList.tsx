import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {

    const { state } = useBudget();

    const isEmpty = useMemo(()=> state.expense.length === 0 , [state.expense])

    return (
        <div className='mt-36'>
            {isEmpty ? 
                <p className="text-gray-600 text-2xl font-black my-5">No hay Gastos</p>
                :
                <>
                    <p className="text-gray-600 text-2xl font-black my-5">Listado de Gastos.</p>

                    {state.expense.map( gasto => 
                        <ExpenseDetail 
                            key={gasto.id}
                            gasto={gasto}
                        />
                    )}
                </>
            }
        </div>
    )
}

export default ExpenseList