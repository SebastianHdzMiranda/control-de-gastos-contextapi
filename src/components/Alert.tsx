import { ReactNode } from "react"

/*
    La propiedad children genera un error en TS
     
    - Normalmente se suele solucionar con ReactNode
    - Aunque tambien puedes usar PropsWithChildren directo en la prop
*/
type AlertProps = {
    children: ReactNode
}

function Alert({children}: AlertProps) {
  return (
    <p className="bg-red-500 py-2 w-full text-white text-center rounded-md font-bold">
        {children}
    </p>
  )
}

export default Alert