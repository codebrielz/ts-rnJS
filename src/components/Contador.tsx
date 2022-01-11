import React, { useState } from 'react'

export const Contador = () => {
    const [contador, setContador] = useState<number>(10);
    
    const acumular = (numero:number) => {
        setContador(contador + numero);
    }

    return (
        <div>
            <h3> Contador <small>{contador}</small> </h3>
            <button className='btn btn-primary' 
            onClick={ ()=> acumular(1) }
            >
                +1
            </button>
            &nbsp;
            <button 
            className='btn btn-primary'
            onClick={()=> acumular(-1)}
            >
                -1
            </button>
        </div>
    )
}
