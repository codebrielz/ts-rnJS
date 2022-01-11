import { useState } from "react";

export const useCounter = (inicial:number = 10) => {
    const [contador, setContador] = useState<number>(inicial);
    
    const acumular = (numero:number) => {
        setContador(contador + numero);
    }

    return{
        contador,
        acumular
    }
}
