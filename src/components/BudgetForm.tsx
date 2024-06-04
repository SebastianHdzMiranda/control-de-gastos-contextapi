import { useState, ChangeEvent, useMemo} from "react"




function BudgetForm() {

    const [ budget, setBudget] = useState(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // AsNumber -> metodo para cambiar el value de un input a numero
        setBudget(e.target.valueAsNumber);
    }

    const isValidBudget = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>

                <input 
                    type="number" 
                    name="budget" 
                    id="budget" 
                    className='w-full bg-white border border-gray-200 p-2'
                    placeholder='Define tu presupuesto'
                    value={budget || ''}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit" 
                value="Definir Presupuesto" 
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-10 transition-opacity" 
                disabled={isValidBudget}    
            />
        </form>
    )
}

export default BudgetForm