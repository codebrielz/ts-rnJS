# Creando nuestro propio hook
* Primero de todo tenemos que crear un folder dentro del folder src llamado hooks para identificar donde estamos creando nuestros hooks (nombraré al archivo useCounter que se encuentra dentro del folder hooks).
* Usualmente al archivo se le coloca use cuando trata de un hook.
* Un hook es una simple funcion que recibe y envia datos modificados.
* Vamos a copiar la logica del useState que teniamos en nuestro archivo ContadorConHook y vamos a copiarla dentro de nuestro custom hook
* Para saber que tiene que regresar nuestro custom hook, podemos regresar al archivo ContadorConHook y ver que nos pide:
```
import React, { useState } from 'react'

export const ContadorConHook = () => {
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
```
* Entonces nos pide el contador y la funcion acumular.
* Nos dirigimos al archivo useCounter
```
import { useState } from "react";

export const useCounter = () => {
    const [contador, setContador] = useState<number>(10);
    
    const acumular = (numero:number) => {
        setContador(contador + numero);
    }

    return{
        contador,
        acumular
    }
}
```
* Entonces una vez retornamos los valores que necesitamos volvemos al archivo ContadorConHook y vamos a utilizar nuestro custom hook:
```
import React, { useState } from 'react'
import { useCounter } from '../hooks/useCounter'; <-- Importamos el custom hook.

export const ContadorConHook = () => {

    const {contador, acumular} = useCounter(); <-- Nuestro custom hook.

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
```
* Ahora aqui hay un punto interesante, imaginemonos que no quiero que mi contador empiece en 10 (es el valor que estoy definiendo en mi useCounter en duro), yo quiero recibirlo como argumento y si no lo recibo que tenga un valor por defecto.
* Para eso creamos el argumento en nuestro custom hook con el tipo de dato que deseamos recibir:
```
import { useState } from "react";

export const useCounter = (inicial:number = 10) => { <-- Aqui
    const [contador, setContador] = useState<number>(inicial); <-- Aqui indicamos que queremos inicializar el contador desde el numero recibidor por el argumento
    
    const acumular = (numero:number) => {
        setContador(contador + numero);
    }

    return{
        contador,
        acumular
    }
}
```
* Y de esta manera lo enviamos desde nuestro archivo ContadorConHook
```
export const ContadorConHook = () => {

    const {contador, acumular} = useCounter(20); <-- Al tener el argumento y un valor por defecto en el mismo, es opcional enviar o no el tipo de inicializacion de mi useCounter

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
```