import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {

    const { state : { expense, filter } } = useBudget();

    // State Derivado
    const displayExpense = expense.filter( expense => expense.category.includes(filter));
    const isEmpty = useMemo(()=> displayExpense.length === 0 , [displayExpense])

    return (
        <div className='mb-3 pt-5'>
            {isEmpty ? 
                <p className="text-gray-600 text-2xl font-black my-5">No hay Gastos</p>
                :
                <>
                    <p className="text-gray-600 text-2xl font-black mb-5">Listado de Gastos.</p>

                    <div className="bg-white rounded-lg p-1 md:p-5">
                        {displayExpense.map( gasto => 
                            <ExpenseDetail 
                                key={gasto.id}
                                gasto={gasto}
                            />
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default ExpenseList