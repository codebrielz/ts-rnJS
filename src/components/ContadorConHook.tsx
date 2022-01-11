import React, { useState } from 'react'
import { useCounter } from '../hooks/useCounter';

export const ContadorConHook = () => {

    const {contador, acumular} = useCounter(20);

    return (
        <div>
            <h2>Creando mi primer custom hook (ContadorConHook)</h2>
            <h3> Contador con hook <small>{contador}</small> </h3>
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
