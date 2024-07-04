import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"

function BudgetTraker() {

  const { state } = useBudget();

  const availableBudget = useMemo(()=> state.expense.reduce( (total, expense) => total + expense.amount, 0) ,[state.expense])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Gráfica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
          Resetear App
        </button>

        <AmountDisplay 
          label='Presupuesto'
          amount={state.budget}
        />
        <AmountDisplay 
          label='Disponible'
          amount={state.budget - availableBudget}
        />
        <AmountDisplay 
          label='Gastado'
          amount={availableBudget}
        />
      </div>      

    </div>
  )
}

export default BudgetTraker