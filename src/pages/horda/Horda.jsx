import CustomSidenav from "../../../components/Nav/Nav.jsx";
import TabelaMembros from "../../../components/TabelaMembros/TabelaMembros.jsx";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Modal, Button, Loader, Notification, useToaster } from 'rsuite';
import GlobalIcon from '@rsuite/icons/Global';

import styles from "./HordaStyle.module.css";
import 'rsuite/dist/rsuite-no-reset.min.css';

const Horda = () => {
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const toaster = useToaster(); 
    const [searchParams] = useSearchParams();
    const token = searchParams.get("q");
    const [player, setPlayer] = useState([]);
    const pagina = "Horda";

    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [loading, setLoading] = useState(false);
    const [linkMorteAlbion, setLinkMorteAlbion] = useState("");
    const [dateRegear, setDateRegear] = useState([]);

    // Modal
    const [open, setOpen] = useState(false);
    const openModal = () => {
        setOpen(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    const fecharModal = () => setOpen(false);

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
        verificarToken();
    }, []);

    const SolicitarRegear = async () => {
        if (linkMorteAlbion.includes("albiononline.com/killboard/kill/")) {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();

            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            const formattedMonth = month < 10 ? `0${month}` : `${month}`;

            setDia(formattedDay);
            setMes(formattedMonth);
            setAno(year.toString());

            setLoading(true);
            const dataSolicitado = `${formattedDay}/${formattedMonth}/${year}`;
            const newRegear = {
                Name: player.User,
                Link: linkMorteAlbion,
                Data: dataSolicitado
            };

            try {
                const res = await fetch(`${BackURL}/api/create/regear`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newRegear)
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 10000);
                const result = await res.json();

                if (result === 200) {
                    toaster.push(
                        <Notification type="success" header="Sucesso" duration={5000} closable>
                            <p>Re-Gear solicitado!</p>
                        </Notification>
                    );
                    setOpen(false)
                    setTimeout(()=>{                        
                        window.location.reload();
                    }, 2000)
                } else {
                    toaster.push(
                        <Notification type="error" header="Error" duration={5000} closable>
                            <p>Erro na solciitação!</p>
                        </Notification>
                    );
                    setLinkMorteAlbion("");
                }
            } catch (error) {
                console.error(error);
                setLinkMorteAlbion("");
            }
        } else {
            setLinkMorteAlbion("");
            toaster.push(
                <Notification type="error" header="Error" duration={5000} closable>
                    <p>Link Invalido!</p>
                </Notification>
            );
            
        }
        setLoading(false);
    };
    
    const getRegearPlayer = async()=>{
        try {
            const regears = await fetch(`${BackURL}/api/get/regear/${player.User}`);
            if(!regears.ok){
                throw new Error(`Erro no API`);
            }
            const dataRes = await regears.json();
            setDateRegear(dataRes)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(player.User){
            getRegearPlayer();
        }
    }, [player]);

    return (
        <div className={styles.Horda}>
            <div>
                <CustomSidenav 
                    Cargo={player.Cargo} 
                    pg={pagina} 
                    Nome={player.User} 
                />
            </div>
            
            <div className={styles.Content}>
                <div className={styles.SolicitarRegear}>
                    <button 
                        className={styles.ButtonSolicitar}
                        onClick={openModal}
                    >
                        Solicitar Re-gear
                    </button>
                </div>

                <div className={styles.TabelaRegear}>
                    {/* Adicione conteúdo da tabela aqui */}
                    <TabelaMembros regears={dateRegear}/>
                </div>

                <div className={styles.PaginacaoRegear}>
                    {/* Adicione conteúdo da paginação aqui */}
                </div>
            </div>

            {loading ? (
                <div className={styles.abrindoModal}>
                    <Loader size="lg" center content="Carregando..." />
                </div>
            ) : (
                <Modal open={open} onClose={fecharModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Solicitação de Re-Gear 
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className={styles.modalRegearBody}>
                        <p>Olá, <span className={styles.nomeJogador}>{player.User}</span>!</p>
                        <p>Para solicitar seu re-gear, você deve ter o link da sua morte e colocar no campo abaixo.</p>
                        <p>Você pode pegar esse link pelo <a href="https://murderledger.com/" target="_blank" className={styles.urlLink}>Murder Ledger</a>, ou direto pelo <a href="https://albiononline.com/killboard" target="_blank" className={styles.urlLink}>Killboard</a> do Albion</p>

                        <div className={styles.DadosRegear}>
                            <input 
                                type="text" 
                                placeholder="Digite o link da morte aqui..." 
                                className={styles.linkMorte}
                                value={linkMorteAlbion}
                                onChange={e => setLinkMorteAlbion(e.target.value)}
                            />
                            <GlobalIcon className={styles.icon} />
                        </div>

                        <div className={styles.DivAtencao}>
                            <p className={styles.AtencaoP}>ATENÇÃO</p>
                        </div>
                        <p>* Itens errados não terão RE-GEAR</p>
                        <p>* Itens com tier não equivalente ao solicitados não terão RE-GEAR</p>
                        <p>* Solicitação de RE-GEAR usando bolsa será recusada</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={SolicitarRegear} appearance="primary">
                            Solicitar
                        </Button>
                        <Button onClick={fecharModal} appearance="subtle">
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Horda;