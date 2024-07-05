import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Alert from "./Alert";
import { useExpenseForm } from "../hooks/useExpenseForm";


function ExpenseForm() {

    const {
        expense,
        alert,
        handleChange,
        handleChangeDate,
        handleSubmit,
        nameForm,
        nameBtnForm
    } = useExpenseForm();

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
                    <option value='' disabled hidden>-- Seleccione</option>
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