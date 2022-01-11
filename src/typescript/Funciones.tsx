import React from 'react'

export const Funciones = () => {

    const sumar = ():number => {
        return 1 + 1;
    }

    const restar = ( a: number, b: number ): number => {
        return 1 + 1;
    }

    return (
        <div>
            <h3>Funciones</h3>
            <p className='alert alert-info'>TypeScript siempre intenta inferir el tipo de dato de cualquier variable, objeto, arreglo y funcion que nosotros escribamos. En el caso de las funciones, ts interpreta que es lo que nos retorna la funcion y añade el tipo de dato que retorna esa funcion.</p>
            <img src={require('../assets/screens/tipoDeDatosFunciones.png')} alt="tipoDeDatosFunciones" />
            <p className='alert alert-info mt-4'>Entonces nosotros directamente podemos indicar que tipo de dato debe regresar nuestra funcion</p>
            <img src={require('../assets/screens/tipoDeRetornoFunciones.png')} alt="tipoDeRetornoFunciones" />
            <p className='alert alert-info mt-4'>Por consecuencia tenemos que indicar el mismo tipo de argumentos en nuestra funcion que retorna un tipo en concreto</p>
            <img src={require('../assets/screens/tipoDeArgumentosFunciones.png')} alt="tipoDeArgumentosFunciones" />
        </div>
    )
}
