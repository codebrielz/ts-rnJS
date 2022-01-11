import React from 'react'

export const TiposBasicos = () => {
    
    // Ts infiere el tipo de dato que le asignemos a la variable creada y evita poder mutar con otro tipo de dato.
    let nombre = "Fernando";
    // Podemos "mutar" el tipo de dato indicandole que puede aceptar tanto un dato como otro de la siguiente manera:
    let nombreDosTipos : string | number = "Fernando";
    nombreDosTipos = 123;
    // Una buena practica es colocar dos puntos y seguidamente el tipo de dato que vayamos a crear:
    // De esta manera sabemos que tipo de dato nos estamos refiriendo sin tener que mirar su valor
    let nombreTres : string = "Gabriel";

    const name: string = "Fernando";
    const age: number = 35;
    const estaActivo: boolean = true;
    const poderes: (string | number)[] = ['Velocidad','Invisibilidad','HameHameHa', 123,894];

    
    return (
        <div>
            <h3>Tipos Básicos</h3>
            <p className='alert alert-info'>· Ts infiere el tipo de dato que le asignemos a la variable creada y evita poder mutar con otro tipo de dato.</p>
            <span><strong>let nombre = "Fernando";</strong></span>
            <p className='alert alert-info mt-4'>· Podemos "mutar" el tipo de dato indicandole que puede aceptar tanto un dato como otro de la siguiente manera:</p>
            <span><strong>let nombreDosTipos : string | number = "Fernando";</strong></span> <br />
            <span><strong>nombreDosTipos = 123;</strong></span>
            <p className='alert alert-info mt-4'>· Una buena practica es colocar dos puntos y seguidamente el tipo de dato que vayamos a crear</p>
            <p className='alert alert-info'>· De esta manera sabemos que tipo de dato nos estamos refiriendo sin tener que mirar su valor</p>
            <span><strong>let nombreTres : string = "Gabriel";</strong></span>
            <h5 className='alert alert-info mt-4'>Lo bueno de que typescript sepa de que tipo es el dato que estamos asignando a la variable, es que nos ofrece una lista de propiedades y metodos relacionados al tipo de dato</h5>
        </div>
    )
}
