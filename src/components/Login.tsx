import React, { useEffect, useReducer } from 'react'
import { tokenToString } from 'typescript'

interface AuthState {
    validando: boolean;
    token: string | null;
    username: string;
    nombre: string;
}

const initialState: AuthState = {
    validando: true,
    token: null, //si tiene algo está autenticado, si no, no lo está
    username:'',
    nombre:''
}

// El action del useReducer es un poco interesante ya que tiene que estar definida en algún lugar, entonces para eso vamos a utilizar el type que es como una interface pero simplemente no se expande
// Los type no generan codigo de javascript
// usualmente las acciones que se le mandan al reducer tienen dos propiedades propiamente (el nombre(type) y tambien pueden tener el payload (es lo que le quiero mandar al reducer))

type LoginPayload = {
    username:string,
    nombre:string
}

type AuthAction = {type:'logout'} 
| {
    type: 'login',
    payload: LoginPayload
}

//La funcion authReducer tiene que retornar un estado igual que el initialState o del mismo tipo
//los dos argumentos serán el state de mi reducer y el action que es el que modifica el state 
const authReducer = ( state:AuthState, action: AuthAction ): AuthState => {
    // Evaluamos el tipo de la accion
    switch (action.type) {
        case 'logout':
            return{
                validando:false,
                token:null,
                username:'',
                nombre:''
            }
        case 'login':
            return{
                validando:false,
                token:'123cadscas456',
                username:action.payload.username,
                nombre: action.payload.nombre,
            }
        default:
            return state;
    }
}

export const Login = () => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'logout'});
        }, 1500);
    }, []);

    const login = () => {
        dispatch({type:'login', 
        payload:{
            username:'Drakong',
            nombre:'Gabriel'
        }
    })
    }

    const logout = () => {
        dispatch({type:'logout'});
    }

    if(state.validando){
        return (
            <>
            <h3>Login</h3>
            <div className='alert alert-info'>validando...</div>
            </>
        )
    }

    return (
        <div>
            <h3>Login</h3>
            {
                (state.token)
                ?
                <div className='alert alert-success'>autenticado como: {state.nombre}</div>
                :
                <div className='alert alert-danger'>no autenticado</div>
            }
            {
                (state.token)
                ?
                <button className='btn btn-danger'
                onClick={logout}>Logout</button>
                :
                <button 
                className='btn btn-primary'
                onClick={login}>Login</button>
            }
        </div>
    )
}
