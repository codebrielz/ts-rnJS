import React from 'react'
import { TiposBasicos } from './typescript/TiposBasicos';
import { ObjetosLiterales } from './typescript/ObjetosLiterales';
import { Funciones } from './typescript/Funciones';
import { Contador } from './components/Contador';
import { ContadorConHook } from './components/ContadorConHook';
import { Login } from './components/Login';

export const App = () => {
  return (
    <>
      <h1>Introduccion a TS - React</h1>
      <hr />
      <TiposBasicos />
      <hr />
      <ObjetosLiterales />
      <hr />
      <Funciones />
      <hr />
      <h2>Components y hooks (práctico)</h2>
      <Contador />
      <hr />
      <ContadorConHook />
      <hr />
      <Login />
    </>
  )
}