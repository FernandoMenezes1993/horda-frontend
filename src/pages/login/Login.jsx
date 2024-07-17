import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from "./LoginStyle.module.css"; // Importação do CSS Module

const Login = () => {
    const navigate = useNavigate();

    const [tipoSenha, setTipoSenha] = useState("password");

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

    const handleLoginClick = () => {
        console.log('Botão Logar clicado');
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
            <div className={styles.formes}>
                <h1>A HORDA</h1>
                
                <div className={styles.inputContainer}>
                    <input className={styles.inputsLogin} type="text" placeholder='Digite seu nome aqui...' />
                    <FaUser className={styles.icon} /> {/* Ícone de usuário */}
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.inputsLogin} type={tipoSenha} placeholder='Digite sua senha...' />
                    {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}
                </div>

                <button id="logarButton" onClick={handleLoginClick}>Logar</button>
                <button onClick={Cadastrar}>Cadastrar</button>
            </div>
        </div>
    )
};

export default Login;