import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from "./CadastroStyle.module.css"; // Importação do CSS Module

import { Loader } from 'rsuite';

const Cadastro = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    

    const [membrosGuilda, setMembrosGuilda] = useState();
    const [tipoSenha, setTipoSenha] = useState("password");

    const toggleTipoSenha = () => {
        setTipoSenha(prevTipo => (prevTipo === 'password' ? 'text' : 'password'));
    };

    const getMembrosGuilda = async () => {
        try {
            const res = await fetch(`${BackURL}/api/playresGuild`);
            if (!res.ok) {
                throw new Error(`Erro na consulta da API playresGuild`);
            }
            const data = await res.json();
            console.log(data)
            setMembrosGuilda(data);
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMembrosGuilda()
    }, []);

    const Login = () => {
        navigate("/")
    }

    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [cssDivInputsName, setCssDivInputsName] = useState("inputContainer");
    const [cssDivInputsPassword, setCssDivInputsPassword] = useState("inputContainer");
    const [cssDivInputsPasswordConfirm, setCssDivInputsPasswordConfirm] = useState("inputContainer");

    const Cadastrar = () =>{
        if(!name == ""){
            setCssDivInputsName("inputContainer");
            console.log("Nome Digitado");
            
            // Verificar se o nome digitado esta na guilda
            console.log(membrosGuilda.length);
            const quantMember = membrosGuilda.length;
            let membroEncontrado = false;

            for(let i = 0; i < quantMember; i++){
                if(name == membrosGuilda[i].nome){
                    console.log("Membro da guilda");

                    membroEncontrado = true;
                    break;
                }                
            }

            if(!membroEncontrado){
                console.log("Membro não é guilda");

                //Encaminhar usuario para tela de convite para guilda
                    //Criar essa tela!

                //Apagar os dados digitados
                setName("");
                setPassword("");
                setPasswordConfirm("");
            }

        }else{
            setCssDivInputsName("inputContainerError");
            setName("");
        }
    }

    
    return (
        <div className={styles.Cadastro}>
            {loading ? (
                <Loader style={{ color: 'black' }} center size="lg" speed="fast" content="Carregando..." />
            ) : (
                <div className={styles.formes}>
                    <h1>A HORDA</h1>

                    <div className={styles[cssDivInputsName]}>
                        <input
                            className={styles.inputsLogin}
                            type="text"
                            placeholder='Digite seu nome aqui...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <FaUser className={styles.icon} />
                    </div>

                    <div className={styles[cssDivInputsPassword]}>

                        <input className={styles.inputsLogin} type={tipoSenha} placeholder='Digite uma senha...' value={password} onChange={e=> setPassword(e.target.value)}/>

                        {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}

                    </div>

                    <div className={styles[cssDivInputsPasswordConfirm]}>

                        <input className={styles.inputsLogin} type={tipoSenha} placeholder='Confirme sua senha.' value={passwordConfirm} onChange={e=> setPasswordConfirm(e.target.value)}/>
                        
                        {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}

                    </div>

                    <button className={styles.logarButton} onClick={Cadastrar}>Cadastrar</button>
                    <button onClick={Login}>Voltar</button>
                </div>
            )}
        </div>
    )
};

export default Cadastro;