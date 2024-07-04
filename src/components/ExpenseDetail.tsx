import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    gasto: Expense
}

function ExpenseDetail({ gasto }: ExpenseDetailProps) {

    const { dispatch } = useBudget();

    /* 
        {formatDate(gasto.date!.toString())}  

        formatDate -> funcion helper que me formatea la fecha, nos devuelve un string
        gasto.date -> como esta propiedad almacena un elemento value, necesitamos cambiarla a string con toString
        gasto.date! -> le decimos a TS que confie que le pasaremos un string
    */
    const categoryInfo = useMemo(()=> categories.filter( category => category.id === gasto.category)[0] , [gasto]);

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: "get-expense-by-id", payload: {id: gasto.id}})}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload: {id: gasto.id }})} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg py-10 px-5 w-full border-b border-gray-200 flex gap-5 items-center cursor-pointer">
                    <div className="">
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`} 
                            alt={`Grafico ${categoryInfo.icon}`} 
                            className="min-w-16 md:w-20"
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
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail