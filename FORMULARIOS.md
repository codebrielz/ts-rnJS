# FORMULARIOS
### Comenzar a crear un formulario sencillo en react
* Vamos a crear la base de nuestro formulario.
* Debe tener un estado que maneje el estado actual del formulario, una estructura HTML con la informacion necesaria sobre sus inputs y el manejo de cambios del formulario (handleInputChange)
```
import React, { useState } from 'react'

export const Formularios = () => {

    // Estado del formulario
    const [formulario, setFormulario] = useState({
        email:'test@test.com',
        password:'123456'
    });

    //El cambio del input
    const onChange = ( value:string, campo:string ) => {
        // value = Cual es el valor de la caja de texto
        // campo = Cual es el campo que quiero actualizar
        setFormulario({
            ...formulario, //<-- desestructuracion de mi formulario
            [campo]: value, //<-- El campo que quiero reemplazar (con las llaves cuadradas indico que quiero computar)
            //Computar es para indicar que quiero computar el valor de esta variable y es esta la propiedad del objeto que quiero establecer
        })


    }

    return (
        <div>
            <h3>Formularios</h3>
            <input type="text"
            className='form-control'
            placeholder='Email' // <-- Aparece escrito en el input
            value={formulario.email} // <-- Es el valor que tiene el input (si tenemos en el estado el value escrito por defecto se verá en pantalla)
             onChange={({target})=> onChange( target.value , 'email')} //<-- 'Email' es el campo que voy a computar en [campo] cuando escriba aqui el usuario
             /> 
            <input type="text"
            className='form-control mt-2 mb-2'
            placeholder='Password'
            value={formulario.password}
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
```
* En este codigo hay bastantes inconvenientes y es que si creo más campos para un registro o para cualquier otro tipo de datos que necesite sobre el usuario, lo que pasará será que tengo que copiar y pegar algunas funciones, para evitar eso vamos a crear OTRO custom hook.
* Tambien vamos a crear genericos en nuestro hook para que asi evitemos posibles errores en la escritura del campo en el onChange (HTML), ya que si nos equivocamos al escribir el campo creará una propiedad rara sin ningún sentido.
* useForm es el archivo que crearé, copiamos y pegamos toda la logica escrita en nuestro archivo Formularios.tsx en nuestro archivo hook useForm:
```
import { useState } from "react"

export const useForm = () => {
        // Estado del formulario
        const [formulario, setFormulario] = useState({
            email:'test@test.com',
            password:'123456'
        });
    
        //El cambio del input
        const onChange = ( value:string, campo:string ) => {
            // value = Cual es el valor de la caja de texto
            // campo = Cual es el campo que quiero actualizar
            setFormulario({
                ...state, //<-- desestructuracion del state de mi formulario
                [campo]: value, //<-- El campo que quiero reemplazar (con las llaves cuadradas indico que quiero computar)
                //Computar es para indicar que quiero computar el valor de esta variable y es esta la propiedad del objeto que quiero establecer
            })
        }

        return{
            formulario,
            onChange
        }
}
```
* importamos y desestructuramos nuestro custom hook en el Formulario.tsx
```
    const { formulario, onChange } = useForm();
```
* Vamos a useForm y vamos a borrar la informacion por defecto que contiene el useState de mi custom hook(useForm) y para recibir los campos necesarios para que funcione el estado y el cambio de mi input, voy a recibirlos mediante argumentos, a parte voy a cambiar el nombre de mi useState de mi custom hook para que tenga más sentido mi aplicacion.
* cambiare de formulario a state y de setFormulario a setState
```
export const useForm = (formulario: any) => {<--Recibo el formulario mediante argumento
        // Estado del formulario
        const [state, setState] = useState(formulario); <-- Obtengo el objeto mediante el argumento
    
        //El cambio del input
        const onChange = ( value:string, campo:string ) => {
            // value = Cual es el valor de la caja de texto
            // campo = Cual es el campo que quiero actualizar
            setState({
                ...state, //<-- desestructuracion del state de mi formulario
                [campo]: value, //<-- El campo que quiero reemplazar (con las llaves cuadradas indico que quiero computar)
                //Computar es para indicar que quiero computar el valor de esta variable y es esta la propiedad del objeto que quiero establecer
            })
        }

        return{
            ...state, <-- mando el state desestructurado para obtener y enviar simplemente las propiedades y ahorrar codigo de más
            state, <-- state actual de mi formulario
            onChange <-- El cambio de mi input
        }
}
```
* Ahora el inconveniente es que el formulario que recibo por argumento es de tipo any, y eso es un problema porque no puedo saber los tipos de datos que obtengo mediante el input
* Por cierto, el argumento recibido proviene de mi archivo Formulario.tsx:
```
export const Formularios = () => {
    const { formulario, onChange } = useForm({ <-- objeto que envio y recibo en mi custo hook
        email:'test@test.com',
        password:'123456'
    });
```
## Genericos en TypeScript
* Los genericos es para establecer un tipo de dato a alguna variable, propiedad, objeto, argumento (lo que sea), entonces esto es el valor que va a retornar mi custo hook, para ello vamos a crear un generico para retornar el tipo de valor que nosotros deseamos obtener.
* Ahora voy a poner dos simbolos de menor a mayor y de mayor a menor <> dentro voy a recibir algo de tipo T <T> usualmente la T es un estandar que se ponga si es el primer generico que nosotros utilizamos en ESTE elemento, puede ser A o B o C, pero es un estandar que si es el primer generico pongamos T.
* Esta <T> va a extender <T extends> un objeto: <T extends Object> (T no importa que sea, va a ser un objeto)
```
import { useState } from "react"

export const useForm = <T extends Object>(formulario: T) => { <-- Aqui lo ponemos
        // Estado del formulario
        const [state, setState] = useState(formulario);
    
        //El cambio del input
        const onChange = ( value:string, campo:string ) => {
            // value = Cual es el valor de la caja de texto
            // campo = Cual es el campo que quiero actualizar
            setState({
                ...formulario, //<-- desestructuracion de mi formulario
                [campo]: value, //<-- El campo que quiero reemplazar (con las llaves cuadradas indico que quiero computar)
                //Computar es para indicar que quiero computar el valor de esta variable y es esta la propiedad del objeto que quiero establecer
            })
        }

        return{
            ...state,
            formulario: state,<-- renombramos el formulario a state
            onChange
        }
}
```
* Al haber desestructurado el estado de mi state de mi custo hook ahora obtengo las propiedades sin necesidad de poner formulario.email, ahora solamente pongo email:
```
import React from 'react'
import { useForm } from '../hooks/useForm'

export const Formularios = () => {

    const { formulario ,email,password, onChange } = useForm({ <-- Obtenemos las propiedades de los campos aqui.
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
```
* Ahora para prevenir errores de escritura en el campo (de mi funcion), puedo decir que el argumento recibido del campo tiene que tener la llave de T (useForm.tsx):
```
        //El cambio del input
        const onChange = ( value:string, campo: keyof T ) => { <-- aqui
```
