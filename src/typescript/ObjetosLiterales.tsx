import React from 'react';

interface Persona {
    nombreCompleto: string;
    edad: number;
    direccion: Direccion;
}

interface Direccion {
    pais: string;
    casaNo: number;
}

export const ObjetosLiterales = () => {
    const persona: Persona = {
        nombreCompleto:'Fernando',
        edad: 35,
        direccion:{
            pais:'Canadá',
            casaNo: 615
        }
    }
    return (
        <div>
            <h3>Objetos Literales</h3>
            <p className='alert alert-info'>En los objetos literales, no podemos añadirles información (propiedades) desde fuera del objeto sin avisar a ts que queremos añadir desde fuera otras propiedades que no existen en el objeto que hemos creado</p>
            <code>
                <strong>
                    <pre>
                        {JSON.stringify(persona, null,2)}
                    </pre>
                </strong>
            </code>
            <p className='alert alert-danger'>
                <strong>NO SE PUEDE AÑADIR PROPIEDADES SIN MÁS: </strong>
                persona.nombreCompleto = "Gabriel Valentin Romero";
            </p>
            <p className='alert alert-warning mt-4'><strong>Esto nos abre las puertas a las interfaces</strong></p>
            <p className='alert alert-info'>El objetivo de una interface es hacer saber a ts como lucen mis objetos</p>
            <img src={require("../assets/screens/Interface.png")} alt="interface"/> <br />
            <img className='mt-2' src={require("../assets/screens/tipo-objeto-mediante-interface.png")} alt="tipo-objeto-mediante-interface"/>
            <p className='alert alert-info mt-2'><strong>Cuando queremos añadir un objeto dentro de otro objeto (en nuestra interface), primero se crea la interface del objeto que queremos anidar a nuestra interface principal del objeto y se añade.</strong></p>
            <img src={require("../assets/screens/interfaces-anidadas.png")} alt="interfaces-anidadas"/>
            <p className='alert alert-danger mt-2'><strong>IMPORTANTE: Las interfaces no sirven para crear instancias, por ejemplo: const persona = new Persona();</strong></p>

        </div>
    )
}
