import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTraker from "./components/BudgetTraker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();

  // Guardar expense en localStorage
  useEffect(() => {
    localStorage.setItem( 'budget', JSON.stringify(state.budget));
    localStorage.setItem('expense', JSON.stringify(state.expense));
  }, [state])
  

  /*
    boolean que me permite conocer el valor de budget
  */
  const isValidBudget = useMemo(()=> state.budget > 0, [state.budget]);
  
  return (
    <>
      <header className="bg-blue-600 min-h-96 pb-10 px-4 lg:px-0">
        <h1 className="text-center uppercase font-bold text-4xl text-white py-14">Planificador de Gastos</h1>

        <div className="max-w-3xl md:mx-auto bg-white shadow-lg rounded-lg p-5 md:p-10 -mb-60 ">
          {isValidBudget ? <BudgetTraker /> : <BudgetForm />}
        </div>
      </header>


      {isValidBudget && 
        <main className="max-w-3xl md:mx-auto pt-24 md:py-10 px-4 lg:px-0 mt-32">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      }
      
    </>
  )
}

export default App
