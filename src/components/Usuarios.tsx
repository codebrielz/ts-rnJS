import { useUsuarios } from '../hooks/useUsuarios';
import { Usuario } from '../interfaces/reqRes';

export const Usuarios = () => {
    const {usuarios, paginaSiguiente, paginaAnterior} = useUsuarios();

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
            className='btn btn-primary'
            onClick={paginaAnterior}>
                Anterior
            </button>
                    &nbsp;
            <button
            className='btn btn-primary'
            onClick={paginaSiguiente}>
                Siguiente
            </button>
        </>
    )
}
