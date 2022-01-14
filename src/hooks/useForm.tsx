import { useState } from "react"

export const useForm = <T extends Object>(formulario: T) =>{
        // Estado del formulario
        const [state, setState] = useState(formulario);
    
        //El cambio del input
        const onChange = ( value:string, campo:keyof T ) => {
            // value = Cual es el valor de la caja de texto
            // campo = Cual es el campo que quiero actualizar
            setState({
                ...state, //<-- desestructuracion de mi formulario
                [campo]: value, //<-- El campo que quiero reemplazar (con las llaves cuadradas indico que quiero computar)
                //Computar es para indicar que quiero computar el valor de esta variable y es esta la propiedad del objeto que quiero establecer
            })
        }

        return{
            ...state,
            formulario: state,
            onChange
        }
}
