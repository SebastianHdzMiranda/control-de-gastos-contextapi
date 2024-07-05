import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget"

function  FilterByCategory() {
  const { dispatch } = useBudget();

  return (
    <div className='bg-white p-6 md:p-10 rounded-xl shadow-lg'>

      <form action="" className="text-center md:flex gap-8 items-center">
        <label htmlFor="category" className='text-2xl inline-block mb-4 md:mb-0 font-extrabold text-gray-600'>Filtrar Gastos</label>
        <select 
          id="category" 
          className='flex-1 w-full text-center bg-gray-600 bg-opacity-5 p-3 rounded-lg' 
          onChange={(e) => dispatch({type:"filter", payload: {category: e.target.value}})}
        >
          <option value="">Todas las Categorias</option>
          {categories.map( category => 

            <option 
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          )}
        </select>
      </form>
    </div>
  )
}

export default FilterByCategory