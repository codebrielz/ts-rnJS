import { useEffect, useRef, useState } from "react"
import { Usuario, ReqResListado } from '../interfaces/reqRes';
import { reqResApi } from '../api/reqRes';

export const useUsuarios = () => {
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
        }else{
            paginaRef.current --;
            alert('No hay más registros');
        }
    }

    const paginaSiguiente = () => {
        paginaRef.current ++;
        cargarUsuarios();
    }

    const paginaAnterior = () => {
        if(paginaRef.current>1){
            paginaRef.current --;
            cargarUsuarios();
        }
    }

    return{
        usuarios,
        paginaSiguiente,
        paginaAnterior
    }
}
