import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTraker from "./components/BudgetTraker";
import ExpenseModal from "./components/ExpenseModal";

function App() {
  const { state } = useBudget();

  /*
    boolean que me permite conocer el valor de budget
  */
  const isValidBudget = useMemo(()=> state.budget > 0, [state.budget]);
  
  return (
    <>
      <header className="bg-blue-600 min-h-96 pb-10">
        <h1 className="text-center uppercase font-bold text-4xl text-white py-10">Planificador de Gastos</h1>

        <div className="max-w-3xl md:mx-auto bg-white shadow-lg rounded-lg p-5 py-10 md:p-10 -mb-60 mx-4">
          {isValidBudget ? <BudgetTraker /> : <BudgetForm />}
        </div>
      </header>


      {isValidBudget && <ExpenseModal />}
      
    </>
  )
}

export default App
