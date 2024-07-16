import "./LoginStyle.css"
import { useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';


const Login =  () =>{

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
        // Lógica para o que acontece quando o botão Logar é clicado
        console.log('Botão Logar clicado');
    };
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
            <button>Cadastrar</button>
          </div>
        </div>
    )
};

export default Login