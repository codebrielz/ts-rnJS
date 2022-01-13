import React, { useEffect, useRef, useState } from 'react'
import { reqResApi } from '../api/reqRes';
import { ReqResListado, Usuario } from '../interfaces/reqRes';

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    useEffect(() => {
        cargarUsuarios()
    }, [])

    const paginaRef = useRef(1);

    const cargarUsuarios = async() =>{
        //llamado al API
        const resp = await reqResApi.get<ReqResListado>('/users', {
            params: {
                page: paginaRef.current //current es para mandar el valor nada mas
            }
        })
        // Validacion
        if(resp.data.data.length > 0){
            setUsuarios(resp.data.data)
            paginaRef.current ++;
        }else{
            alert('No hay más registros');
        }
    }

    const renderItem = ( user:Usuario )=>{
        // Los key deben ser strings entonces vamos a transformar de number a string
        return(
            <tr key={user.id.toString()}>
                <td>
                    <img src={user.avatar} alt={user.avatar} />
                </td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
            </tr>
        )
    }

    return (
        <>
            <h3>Usuarios:</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((user)=>(
                            renderItem(user)
                        ))
                    }
                </tbody>
            </table>
            <button
            onClick={cargarUsuarios}>
                Siguiente
            </button>
        </>
    )
}
