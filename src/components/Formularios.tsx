import React from 'react'
import { useForm } from '../hooks/useForm'

export const Formularios = () => {

    const { formulario ,email,password, onChange } = useForm({
        email:'test@test.com',
        password:'123456'
    });

    return (
        <div>
            <h3>Formularios</h3>
            <input type="text"
            className='form-control'
            placeholder='Email' // <-- Aparece escrito en el input
            value={email} // <-- Es el valor que tiene el input (si tenemos en el estado el value escrito por defecto se verá en pantalla)
             onChange={({target})=> onChange( target.value , 'email')} //<-- 'Email' es el campo que voy a computar en [campo] cuando escriba aqui el usuario
             /> 
            <input type="text"
            className='form-control mt-2 mb-2'
            placeholder='Password'
            value={password}
            onChange={({target})=> onChange( target.value , 'password')}
            />
            <code>
                <pre>
                    {JSON.stringify(formulario, null, 2)}
                </pre>
            </code>
        </div>
    )
}
