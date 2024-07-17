import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

import { Loader, Notification, useToaster  } from 'rsuite';

import styles from "./LoginStyle.module.css"; // Importação do CSS Module
import 'rsuite/dist/rsuite-no-reset.min.css';

const Login = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const toaster = useToaster(); 

    const [tipoSenha, setTipoSenha] = useState("password");
    const [membrosGuilda, setMembrosGuilda] = useState();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cssDivInputsName, setCssDivInputsName] = useState("inputContainer");
    const [cssDivInputsPassword, setCssDivInputsPassword] = useState("inputContainer");

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

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                document.getElementById('logarButton').click();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const Logar = async () => {
        if(!name == ""){
            setCssDivInputsName("inputContainer");

            if(!password == ""){
                setCssDivInputsPassword("inputContainer");
                
                //@@@@@@@@@@@@@@@@@@@@@@@@
                console.log(membrosGuilda.length);
                const quantMember = membrosGuilda.length;
                let membroEncontrado = false;

                for(let i = 0; i < quantMember; i++){
                    if(name == membrosGuilda[i].nome){
                        console.log("Membro da guilda");

                        try {
                            const checksNameRegistered = await fetch(`${BackURL}/api/checks/name/${name}`);
                            if (!checksNameRegistered.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            };
                            const res = await checksNameRegistered.json();
                            if(res.User == 404){
                                toaster.push(
                                    <Notification type="warning" header="Aviso" duration={5000} closable>
                                        <p>Você faz parte da <strong>HORDA</strong>.</p>
                                        <p>Mas deve registrar-se aqui na ferramenta!</p>
                                    </Notification>
                                )                                                              
                            }

                            if(res.User == 502){
                                const apiCheckPasswod = `${BackURL}/api/checks/user/${name}/${password}`
                                
                                try {
                                    const checksUser = await fetch(apiCheckPasswod);
                                    if(!checksUser.ok){
                                        throw new Error(`Erro na busca da API ${apiCheckPasswod}`);
                                    }
                                    const res = await checksUser.json()
                                    if(res.res == 200){
                                        setLoading(true)
                                        toaster.push(
                                            <Notification type="success" header="Logando" duration={5000} closable>
                                                <p>Seja bem vindo!</p>
                                            </Notification>
                                        );
                                        setTimeout(()=>{
                                            setLoading(false)
                                            navigate(`/horda?q=${res.token}`);
                                        }, 3000);
                                    }
                                    if(res.res == 502){
                                        toaster.push(
                                            <Notification type="error" header="Erro" duration={5000} closable>
                                                <p>Credenciais invalidas!</p>
                                            </Notification>
                                        );
                                        setName("");
                                        setPassword("")
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }

                        } catch (error) {
                            console.error(error);
                        }
                        membroEncontrado = true;
                        break;
                    }                    
                }
                if(!membroEncontrado){
                    toaster.push(
                        <Notification type="error" header="Erro" duration={5000} closable>
                            <p>Você não faz parte da <strong>HORDA</strong></p>
                            <p>Clique <a href="https://discord.gg/JjfWEWNJbc">AQUI</a> para ser recrutado!</p>
                        </Notification>
                    );

                    //Encaminhar usuario para tela de convite para guilda
                        //Criar essa tela!

                    //Apagar os dados digitados
                    setName("");
                    setPassword("");
                }
                //@@@@@@@@@@@@@@@@@@@@@@@@
            }else{
                setCssDivInputsPassword("inputContainerError");
                toaster.push(
                    <Notification type="error" header="Erro" duration={5000} closable>
                        <p>Digite sua senha!</p>
                    </Notification>
                );
            }

        }else{
            setCssDivInputsName("inputContainerError");
            toaster.push(
                <Notification type="error" header="Erro" duration={5000} closable>
                    <p>O nome é obrigatório!</p>
                </Notification>
            );
        }
    };
    // Navegar para tela de cadastro
    const Cadastrar = () => {
        navigate("/Cadastro")
    }
    const toggleTipoSenha = () => {
        setTipoSenha(prevTipo => (prevTipo === 'password' ? 'text' : 'password'));
    };
    return (
        <div className={styles.Login}>
            {loading ? (
                <div className={styles.Carregamento}>
                    <Loader style={{ color: 'black' }} center size="lg" speed="fast" content="Carregando..." />
                </div>
                
            ) : (
                <div className={styles.formes}>
                    <h1>A HORDA</h1>
                    
                    <div className={styles[cssDivInputsName]}>
                        <input className={styles.inputsLogin} type="text" placeholder='Digite seu nome...' value={name} onChange={e=> setName(e.target.value)} />
                        <FaUser className={styles.icon} /> {/* Ícone de usuário */}
                    </div>

                    <div className={styles[cssDivInputsPassword]}>
                        <input className={styles.inputsLogin} type={tipoSenha} placeholder='Digite sua senha...' value={password} onChange={e=> setPassword(e.target.value)}/>
                        {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}
                    </div>

                    <button id="logarButton" onClick={Logar}>Logar</button>
                    <button onClick={Cadastrar}>Registrar-se</button>
                </div>
            )}
        </div>
    )
};

export default Login;