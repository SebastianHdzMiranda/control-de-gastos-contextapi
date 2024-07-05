import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { DraftExpense, Expense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";


export function useExpenseForm() {

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
        // console.log(expense)
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
    const nameBtnForm = () => state.editingId ? 'Guardar Cambios' : 'Registrar gasto';


    return {
        state,
        expense,
        alert,
        handleChange,
        handleChangeDate,
        handleSubmit,
        nameForm,
        nameBtnForm
    }
}