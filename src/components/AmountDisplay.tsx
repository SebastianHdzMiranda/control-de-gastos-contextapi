import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    // ? -> al declarar esto en el key, decimos que esta prop es opcional
    label?: string
    amount: number
}

function AmountDisplay({label, amount}: AmountDisplayProps) {
  return (
    <p className="text-xl md:text-2xl text-blue-600 font-bold">
        {/* {label}{': '} */}
        {label && `${label}: `}
        <span className="font-bold text-slate-700">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay