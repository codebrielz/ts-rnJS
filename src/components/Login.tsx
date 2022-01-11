import React from 'react'

export const Login = () => {
    return (
        <div>
            <h3>Login</h3>
            <div className='alert alert-info'>validando...</div>
            <div className='alert alert-danger'>no autenticado</div>
            <div className='alert alert-success'>autenticado</div>

            <button className='btn btn-primary'>Login</button>
            <button className='btn btn-danger'>Logout</button>
        </div>
    )
}
