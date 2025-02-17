import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import Swal from 'sweetalert2'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function BudgetTraker() {

  const { state, dispatch } = useBudget();

  const availableBudget = useMemo(()=> state.expense.reduce( (total, expense) => total + expense.amount, 0) ,[state.expense])
  const percentage = +((availableBudget / state.budget) * 100).toFixed(2);

  const handleReset = () => {

    Swal.fire({
      title: "¿Está seguro?",
      text: "¡Se reiniciara el presupuesto y los gastos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, Resetea!",
      cancelButtonText: "¡No, cancela!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({type: 'reset-app'});
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      
      <div className="flex justify-center max-w-64 mx-auto mb-10 md:mb-0">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textSize: 10,
            textColor:  percentage === 100 ? '#dc2626' : '#3b82f6',
          })}
          text={`${percentage}% Gastado`}
        >
        </CircularProgressbar>
      </div>

      <div className="flex flex-col justify-center gap-8 items-center">
        <button onClick={handleReset} className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg mb-8">
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