import CustomSidenav from "../../../components/Nav/Nav.jsx";
import TabelaMembros from "../../../components/TabelaStaff/TabelaStaff.jsx";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Button, Loader, Notification, useToaster } from 'rsuite';
import GlobalIcon from '@rsuite/icons/Global';

import styles from "./PedidosStaff.module.css";
import 'rsuite/dist/rsuite-no-reset.min.css';

const PedidosStaff = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const toaster = useToaster(); 
    const [searchParams] = useSearchParams();
    const token = searchParams.get("q");
    const [player, setPlayer] = useState([]);
    const pagina = "PedidosStaff";

    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [loading, setLoading] = useState(false);
    const [linkMorteAlbion, setLinkMorteAlbion] = useState("");
    const [dateRegear, setDateRegear] = useState([]);


    const verificarToken = async () => {
        console.log(token)
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if (!res.ok) {
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            setPlayer(data);
            console.log(data)
            if (data.res === 502) {
                
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (token) {
            verificarToken();
        } else {
            console.log("Token não encontrado, redirecionando para login");
            navigate(`/`);
        }
    }, [token]);
    
    const [detaRegear, setDetaRegear] = useState([]);
    const getAllRegear = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/get/all/regear/staff`);
            if(!res.ok){
                throw new Error('Erro na consulta da API getAllRegear');
            }
            const data = await res.json();
            setDetaRegear(data);
           
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if (player.User) {
            getAllRegear();
        }
    }, [player])

    return (
        <div className={styles.Horda}>
            <div>
                <CustomSidenav 
                    Cargo={player.Cargo} 
                    pg={pagina} 
                    Nome={player.User} 
                    token={token}
                />
            </div>
            
            <div className={styles.Content}>
                <div className={styles.SolicitarRegear}>
                    
                </div>

                <div className={styles.TabelaRegear}>
                    <TabelaMembros regears={detaRegear} token={token}/>
                </div>
            </div>
        </div>
    );
};

export default PedidosStaff;