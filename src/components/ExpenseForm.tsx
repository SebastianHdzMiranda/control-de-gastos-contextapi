import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";
import Alert from "./Alert";


function ExpenseForm() {

    // Use Hooks - useContext
    const { state, dispatch } = useBudget();

    const initialExpense: DraftExpense = {
        name: '',
        amount: 0,
        category: '',
        date: new Date()
    }

    // States
    const [ expense, setExpense ] = useState<DraftExpense>(initialExpense);
    const [ alert, setAlert ] = useState('');

    // Functions
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {id, value} = e.target;
        const isNumber = ['amount'].includes(id);

        setExpense({
            ...expense,
            [id]: isNumber ? +value : value, 
        });
    }

    const handleChangeDate = (value: Value) => {
        console.log(value)
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        // Validacion
        if (Object.values(expense).includes('')) {
            setAlert('*Todos los campos son obligatorios');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }

        // chacar presupuesto, el amount es menor al presupuesto
        if(!isValidAmount()) {
            setAlert('*La cantidad se sale de tu presupuesto');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }
        

        dispatch({type:"add-expense", payload:{expense}})
        setExpense(initialExpense);
        setTimeout(() => {
            dispatch({type:"show-modal"})
        }, 100);

    }

    // Function helpers
    const isValidAmount = () => state.availableBudget >= expense.amount;


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>
            {alert && <Alert>{alert}</Alert>}

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl">Nombre Gasto:</label>
                <input 
                    type="text" 
                    className="bg-slate-100 p-2"
                    id="name"
                    name="name"
                    placeholder="Añade el Nombre del gasto"
                    value={expense.name}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input 
                    type="number" 
                    className="bg-slate-100 p-2"
                    id="amount"
                    name="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    value={expense.amount || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoría:</label>
                <select 
                    className="bg-slate-100 p-2 text-center"
                    id="category"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}

                >
                    <option defaultValue={''} selected>-- Seleccione</option>
                    {categories.map( category => 

                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    )}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <DatePicker 
                    className="bg-slate-100 p-2 border-none"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit" 
                className="bg-blue-500 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" 
                value='Registrar gasto'
            />
        </form>
    )
}

export default ExpenseForm