import "./LoginStyle.css"
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';


const Login =  () =>{
    const navigate = useNavigate();

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
    const Cadastrar = ()=>{
        navigate("/Cadastro")
    }
    return(
        <div className="Login">
          <div className="formes">
            <h1>A HORDA</h1>
            <div className="input-container">
                <input className="inpusLogin" type="text" placeholder='Digite seu nome aqui...' />
                <FaUser className="icon" /> {/* Ícone de usuário */}
            </div>
            <div className="input-container">
                <input className="inpusLogin" type="password" placeholder='Digite sua senha...' />
                <FaLock className="icon" /> {/* Ícone de cadeado */}
            </div>
            <button id="logarButton" onClick={handleLoginClick}>Logar</button>
            <button onClick={Cadastrar}>Cadastrar</button>
          </div>
        </div>
    )
};

export default Login