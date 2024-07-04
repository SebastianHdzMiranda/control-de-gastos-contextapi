import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {

    const { state : { expense } } = useBudget();

    const isEmpty = useMemo(()=> expense.length === 0 , [expense])

    return (
        <div className='mt-36 mb-3'>
            {isEmpty ? 
                <p className="text-gray-600 text-2xl font-black my-5">No hay Gastos</p>
                :
                <>
                    <p className="text-gray-600 text-2xl font-black mb-5">Listado de Gastos.</p>

                    {expense.map( gasto => 
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