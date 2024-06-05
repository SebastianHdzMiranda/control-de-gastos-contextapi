import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

type ExpenseDetailProps = {
    gasto: Expense
}

function ExpenseDetail({ gasto }: ExpenseDetailProps) {

    /* 
        {formatDate(gasto.date!.toString())}  

        formatDate -> funcion helper que me formatea la fecha, nos devuelve un string
        gasto.date -> como esta propiedad almacena un elemento value, necesitamos cambiarla a string con toString
        gasto.date! -> le decimos a TS que confie que le pasaremos un string
    */

    const categoryInfo = useMemo(()=> categories.filter( category => category.id === gasto.category)[0] , [gasto]);

    console.log(categoryInfo)
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
            
            <div className="">
                <img 
                    src={`/icono_${categoryInfo.icon}.svg`} 
                    alt={`Grafico ${categoryInfo.icon}`} 
                    className="w-20"
                />
            </div>

            <div className="flex-1">
                <p className="text-sm font-black uppercase text-slate-500">{categoryInfo.name}</p>
                <p className="text-2xl">{gasto.name}</p>
                <p className="text-slate-600 text-sm">{formatDate(gasto.date!.toString())}</p>
            </div>
            <AmountDisplay 
                amount={gasto.amount}
            />
        </div>
    )
}

export default ExpenseDetail