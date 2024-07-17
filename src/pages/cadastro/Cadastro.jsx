import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from "./CadastroStyle.module.css"; // Importação do CSS Module
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Loader, Notification, useToaster  } from 'rsuite';

const Cadastro = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const toaster = useToaster();    

    const [membrosGuilda, setMembrosGuilda] = useState();
    const [tipoSenha, setTipoSenha] = useState("password");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [cssDivInputsName, setCssDivInputsName] = useState("inputContainer");
    const [cssDivInputsPassword, setCssDivInputsPassword] = useState("inputContainer");
    const [cssDivInputsPasswordConfirm, setCssDivInputsPasswordConfirm] = useState("inputContainer");

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

    const Cadastrar = async() =>{
        if(!name == ""){
            setCssDivInputsName("inputContainer");
            console.log("Nome Digitado");
            
            if(!password == ""){
                setCssDivInputsPassword("inputContainer");

                if(!passwordConfirm == ""){
                    setCssDivInputsPasswordConfirm("inputContainer");

                    if(password == passwordConfirm){
                        setCssDivInputsPassword("inputContainer");
                        setCssDivInputsPasswordConfirm("inputContainer");

                        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                        // Verificar se o nome digitado esta na guilda
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
                                        console.log("Podemos cadastrar");
                                        const newUser ={
                                            Name: name,
                                            Senha: password
                                        };
                                        try {
                                            const cadastroNewUser = await fetch(`${BackURL}/api/user/new`,{
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(newUser)
                                            });
                                            if (!cadastroNewUser.ok) {
                                                throw new Error(`HTTP error! status: ${cadastroNewUser.status}`);
                                            }
                                            const result = await cadastroNewUser.json();
                                            toaster.push(
                                                <Notification type="success" header="Cadastrado" duration={5000} closable>
                                                    <p>Cadastro realizado com sucesso!</p>
                                                </Notification>
                                            );
                                            setName("");
                                            setPassword("");
                                            setPasswordConfirm("");

                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                    if(res.User == 502){
                                        toaster.push(
                                            <Notification type="warning" header="Aviso" duration={5000} closable>
                                                <p>Você já está cadastrado!</p>
                                                <p>Clique <a href="https://www.albionhorda.com.br/">AQUI</a> para logar!</p>
                                            </Notification>
                                        );
                                        setName("");
                                        setPassword("");
                                        setPasswordConfirm("");
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
                                    <p>Você ainda não faz parte da <strong>HORDA</strong></p>
                                    <p>Clique <a href="https://discord.gg/JjfWEWNJbc">AQUI</a> para ser recrutado!</p>
                                </Notification>
                            );

                            //Encaminhar usuario para tela de convite para guilda
                                //Criar essa tela!

                            //Apagar os dados digitados
                            setName("");
                            setPassword("");
                            setPasswordConfirm("");
                        }
                        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                    }else{
                        setCssDivInputsPasswordConfirm("inputContainerError");
                        setCssDivInputsPassword("inputContainerError");
                        
                        toaster.push(
                            <Notification type="error" header="Erro" duration={5000} closable>
                                <p>Senha digitada é diferente da confirmação!</p>
                            </Notification>
                        );
                    }
                }else{
                    setCssDivInputsPasswordConfirm("inputContainerError");
                    toaster.push(
                        <Notification type="error" header="Erro" duration={5000} closable>
                            <p>Digite a confirmação da senha!</p>
                        </Notification>
                    );
                }
            }else{
                setCssDivInputsPassword("inputContainerError");
                toaster.push(
                    <Notification type="error" header="Erro" duration={5000} closable>
                        <p>Você deve digitar uma senha!</p>
                    </Notification>
                );
            }
        }else{
            setCssDivInputsName("inputContainerError");
            setName("");            
            toaster.push(
                <Notification type="error" header="Erro" duration={5000} closable>
                    <p>O nome é obrigatório!</p>
                </Notification>
            );
        }
    }

    
    return (
        <div className={styles.Cadastro}>
            {loading ? (
                <div className={styles.Carregamento}>
                    <Loader style={{ color: 'black' }} center size="lg" speed="fast" content="Carregando..." />
                </div>
                
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