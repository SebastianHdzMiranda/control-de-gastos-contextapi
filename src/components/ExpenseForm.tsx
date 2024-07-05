import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Expense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";
import Alert from "./Alert";


function ExpenseForm() {

    // Use Hooks - useContext
    const { state, dispatch } = useBudget();

    // Editing
    useEffect(() => {
        if (state.editingId) {
            const editingExpense : Expense = state.expense.filter( expense => expense.id === state.editingId)[0];
            setExpense(editingExpense);
        }
    }, [state.editingId])
    
    
    const initialExpense: DraftExpense = {
        name: '',
        amount: 0,
        category: '',
        date: new Date()
    }

    // States
    const [ expense, setExpense ] = useState(initialExpense);
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
        if (Object.values(expense).includes('') || Object.values(expense).includes(0)) {
            setAlert('*Todos los campos son obligatorios');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }

        // // chacar presupuesto, el amount es menor al presupuesto
        if(!isValidAmount()) {
            setAlert('*La cantidad se sale de tu presupuesto');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }
        
        if (state.editingId) {
            dispatch({type:"update-expense", payload:{expense: {...expense, id: state.editingId}}});
            
        } else {
            dispatch({type:"add-expense", payload:{expense}})
        }
        setExpense(initialExpense);
    }

    // 
    const isValidAmount = () => {
        let availableBudget;

        if (state.editingId) {
            // Filtrar el gasto del id activo editando.
            const expense = state.expense.filter( expense => expense.id !== state.editingId);
            availableBudget  = state.budget -  expense.reduce( (total, expense) => total + expense.amount, 0);        
        } else {
            availableBudget  = state.budget -  state.expense.reduce( (total, expense) => total + expense.amount, 0);        
        }
        return availableBudget >= expense.amount;
    }

    const nameForm = () => state.editingId ? 'Editar Gasto' : 'Nuevo Gasto';
    const nameBtnForm = () => state.editingId ? 'Guardar Cambios' : 'Registrar gasto'

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{nameForm()}</legend>
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
                <label htmlFor="amount" className="text-xl">Fecha:</label>
                <DatePicker 
                    className="bg-slate-100 p-2 border-none"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit" 
                className="bg-blue-500 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" 
                value={nameBtnForm()}
            />
        </form>
    )
}

export default ExpenseForm