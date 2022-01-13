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
* Prmero crearemos el codigo para la paginación en el mismo archivo de Usuarios.tsx para observar como va creciendo nuestro codigo poco a poco y lo acabaremos resolviendo creando un custom hook que mantendrá activo y actualizado ese mismo codigo que vamos a crear ahora.
* Para crear la paginación en la API de reqres tenemos que dirigirnos a PostMan y en el Query Params escribir page y su value la pagina que queramos obtener
```
key: page
value: 2
respuesta de postman: https://reqres.in/api/users?page=2
```
* Por ejemplo la page 3 no existe ya que PostMan nos indica que data es un arreglo vacio
* Entonces nosotros tenemos que volver a realizar una nueva peticion HTTP entonces, en teoria puedo crear una funcion con el nombre de cargarUsuarios y en su cuerpo voy a pegar el codigo que contenia useEffect y en el cuerpo de useEffect voy a mandar a llamar la funcion recien creada:
```
    useEffect(() => {
        cargarUsuarios()
    }, [])

    const cargarUsuarios = () =>{
          //llamado al API
          reqResApi.get<ReqResListado>('/users')
          .then((r)=>setUsuarios(r.data.data))
              .catch(console.log)
    }
```
* Vamos a crear un button en nuestro return principal con un onClick que va a mandar a llamar la funcion recien creada.
* Antes que nada vamos a refactorizar el codigo de cargarUsuarios utilizando async/await ya que no está dentro del cuerpo de useEffect y ahora si podemos utilizarlo:
```
const cargarUsuarios = async() =>{
        //llamado al API
        const resp = await reqResApi.get<ReqResListado>('/users')
        setUsuarios(resp.data.data);  
    }
```
* Ahora cuando le doy al boton lo unico que hace es renderizar la misma data ya que solamente llama a la misma peticion todo el rato, entonces yo necesito de alguna manera actualizar la informacion de los usuarios y para eso podria utilizar el useState, pero aqui hay un inconveniente y es que useState renderiza el codigo HTML y yo no necesito eso, solamente necesito cambiar la informacion una vez de click.
* Eso da pie a utilizar useRef para crear una referencia, lo que hace useRef es que cuando cambia su valor sigue siendo la misma pero no va a cambiar su procedimiento para renderizar el componente
```
    const paginaRef = useRef(1); <-- importamos el hook
```
* Ahora tiene el valor de 1, entonces sabemos que cuando el componente se vuelve a cargar tiene el valor de uno
* En la peticion tenemos que mandarle el query param para actualizar la paginacion.
* En el codigo de la peticion HTTP vamos a hacer la configuracion de axis que es para realizar una serie de querys u opciones a nuestra peticion HTTP
```
  const cargarUsuarios = async() =>{
        //llamado al API
        const resp = await reqResApi.get<ReqResListado>('/users', { <--Aqui creamos el objeto para su configuracion
            params: { <-- params es otro objeto que contendrá los query params de la peticion http
                page: paginaRef.current <-- Aqui mandamos a llamar el hook de useRef //current es para mandar el valor nada mas (1)
            }
        })
        setUsuarios(resp.data.data);  
    }
```
* Ahora tenemos que hacer algunas validaciones antes de incrementar el valor de useRef mediante el boton, esas validaciones vamos a hacerlo dentro de la misma funcion de cargarUsuarios
```
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
```