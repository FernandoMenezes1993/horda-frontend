import { useState, useEffect  } from 'react';

import "./CadastroStyle.css"

const Cadastro =  () =>{
    const BackURL = import.meta.env.VITE_URL;

    const [membrosGuilda, setMembrosGuilda] = useState();

    const getMembrosGuilda = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/playresGuild`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API playresGuild`);
            }
            const data = await res.json();
            console.log(data)
            setMembrosGuilda(data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        getMembrosGuilda()
    }, []);

    const Mostrar = ()=>{
        console.log(membrosGuilda)
    }
    return(
        <div className="Cadastro">
            <h1>Cadastro</h1>
            <button onClick={Mostrar}>teste</button>
        </div>
    )
};

export default Cadastro