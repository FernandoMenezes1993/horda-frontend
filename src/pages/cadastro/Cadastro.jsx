import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from "./CadastroStyle.module.css"; // Importação do CSS Module

const Cadastro = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();

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
        }
    };

    useEffect(() => {
        getMembrosGuilda()
    }, []);

    const Login = () => {
        navigate("/")
    }

    return (
        <div className={styles.Cadastro}>
            <div className={styles.formes}>
                <h1>A HORDA</h1>
                <div className={styles.inputContainer}>
                    <input className={styles.inputsLogin} type="text" placeholder='Digite seu nome aqui...' />
                    <FaUser className={styles.icon} /> {/* Ícone de usuário */}
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.inputsLogin} type={tipoSenha} placeholder='Digite uma senha...' />
                    {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.inputsLogin} type={tipoSenha} placeholder='Confirme sua senha...' />
                    {tipoSenha === 'password' ? <FaEye className={styles.iconOlho} onClick={toggleTipoSenha} /> : <FaEyeSlash className={styles.iconOlho} onClick={toggleTipoSenha} />}
                </div>

                <button className={styles.logarButton}>Cadastrar</button>
                <button onClick={Login}>Voltar</button>
            </div>
        </div>
    )
};

export default Cadastro;