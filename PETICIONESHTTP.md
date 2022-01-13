# Peticiones HTTP - Axios
* Archivo en el que vamos a trabajar: components/Usuarios
* Estructura HTML creada por ahora
```
import React from 'react'

export const Usuarios = () => {
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
                    
                </tbody>
            </table>
        </>
    )
}
```
* Vamos a la pagina para probar el API: https://reqres.in/
* Y nos dirigimos al apartado (haciendo scroll hacia abajo) hasta List users y donde pone Request nos mostrará el endpoint que tenemos que llamar, le damos click al path y nos lleva a la respuesta que nosotros vamos a tener que trabajar y tipar.
* La ventaja de tipar esto es que a la hora de trabajar con esto, no nos equivocaremos en los nombres.
* Entonces nos copiamos el siguiente url y cerramos el API:
```
https://reqres.in/api/users?page=2
```
* Y lo abrimos en postman y probamos el url
* Entonces esto es lo que necesito yo que aparezca en mi tabla por primera vez cuando cargue mi pagina, y como necesito que se cargue por primera vez entonces utilizaré el useEffect.
```
import React, { useEffect } from 'react'

export const Usuarios = () => {
    useEffect(() => {
        //llamado al API
        
    }, [])
```
* Para hacer la llamada al API vamos a utilizar AXIOS
* Vamos a instalar axios desde la siguiente pagina: https://www.npmjs.com/package/axios
```
npm install axios
```
* Vamos a crear un folder llamado api en esta carpeta voy a colocar todos los lugares o referencias a las peticiones que voy a disparar.
* Vamos a hacer la configuracion para que cualquier otra peticion mia que yo quiera hacer a esta API, simplemente voy a hacer referencia a un objeto que crearé en el lugar de la llamada al API.
* creamos un archivo llamado: reqRes.tsx (reqRes es la api a la que voy a llamar por eso el nombre, obviamente no es obligatorio, pero si facil de identificar de que aqui proviene)
* configuracion del API:
```
import axios from "axios";

export const reqResApi = axios.create({
    //base a la que voy hacer la peticion
    baseURL: 'https://reqres.in/api'
});
```
* Entonces nos dirigimos al archivo Usuarios y vamos a hacer la peticion (en este caso get) para obtener el resultado del API
* En el useEffect no se puede utilizar async/await por tanto vamos a utilizar then y catch para obtener la respuesta de la promesa, es decir, esperar la respuesta y mostrarla.
```
export const Usuarios = () => {
    useEffect(() => {
        //llamado al API
        // INDICAMOS: que el path que quiero obtener el /users (ya que en la configuracion de axios hemos puesto la baseURL y esto es lo que sigue despues de la baseURL)
        reqResApi.get('/users').then((r)=>console.log(r.data.data)).catch(console.log)
    }, [])
```
* La informacion que nos interesa viene dentro del objeto llamado data que a su vez tiene otro objeto que nos interesa llamado data.
* Dentro de la misma se encuentra los datos que me interesa el inconveniente es que nos tenemos que acordar de el nombre de cada "propiedad" entonces para ello vamos a tiparlo y asi evitamos errores de escrituras a la hora de llamar a cada una de estas "propiedades".
* Vamos a crear un folder llamado interfaces y dentro un archivo con el nombre de la api (opcional) (interfaces/reqRes.tsx) más bien es para identificar de que api proviene esa data.
* Entonces dentro del archivo interfaces/reqRes.tsx vamos a comenzar a tipar los datos, entonces vamos a utilizar un servicio que nos ayuda a hacer el tipado automatico.
```
https://app.quicktype.io/
```
* Copiaremos la respuesta JSON de postman y la pegaremos en esta pagina, tenemos que tener en las opciones la opcion de interfaces only y Verify JSON.parse results at runtime
* Esta es la respuesta de la transformacion de JSON a Tipado de la web:
```
export interface ReqResListado {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Usuario[];
    support:     Support;
}

export interface Usuario {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}
```
* Hay una forma más rapida de convertir la respuesta JSON a tipado, y es con una extension llamada: Paste JSON as Code.
* Regresamos al archivo que contiene la peticion HTTP (Usuarios.tsx) y vamos a convertir el tipo de peticion ya que es generico:
```
    useEffect(() => {
        //llamado al API
        reqResApi.get<ReqResListado>('/users') <--Aqui <ReqResListado>
            .then((r)=>console.log(r.data.data))
                .catch(console.log)
    }, [])
```
* De esta forma nos da ayuda automatica vscode
* Vamos a renderizar la respuesta en pantalla y para eso vamos a utilizar useState ya que tiene que renderizar
```
    const [usuarios, setUsuarios] = useState([]);
```
* Cuando nosotros vamos a retornar algo en un arreglov vacio, es importante y util saber el tipo de retorno que tendrá mi arreglo, en nuestro caso va a ser la cantidad de usuarios que vamos a obtener desde la api. Para eso vamos a ponerle un generico a nuestro useState, y obviamente el tipo de generico que nuestro arreglo retornará será la interface que hemos creado anteriormente (hay que importarla):
```
    import { ReqResListado, Usuario } from '../interfaces/reqRes';
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
```
## Mostrar usuarios en pantalla
* Vamos a modificar el estado de el state usuarios de tipo Usuario[] añadiendolo en el cuerpo de mi peticion http:
```
    useEffect(() => {
        //llamado al API
        reqResApi.get<ReqResListado>('/users')
            .then((r)=>setUsuarios(r.data.data)) <--Aqui
                .catch(console.log)
    }, [])
```
* Vamos a crear una funcion que reciba el usuario de tipo Usuario(interface) y vamos a ejecutar dentro del cuerpo de la funcion un retorno de tipo jsx
```
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
```
* Ahora dentro de nuestro return principal vamos a crear un loop que recorra cada uno de los usuarios obtenidos por la peticion HTTP y eso está guardado en nuestro state usuario:
```
<tbody>
                    {
                        usuarios.map((user)=>(
                            renderItem(user)
                        ))
                    }
                </tbody>
```
## Crear una pequeña paginación
