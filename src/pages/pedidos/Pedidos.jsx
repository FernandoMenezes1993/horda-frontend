import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';

import { Loader, Notification, useToaster } from 'rsuite';
import LaMuerte  from "../../../public/img/icon/LaMuerte.png"
import CertoVerde from "../../../public/img/icon/PedidoCerto.png"

import styles from "./PedidosStyle.module.css"; 

const Pedidos = () => {
    const[loading, setLoading] = useState(false);
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();
    const toaster = useToaster(); 

    const BackURL = import.meta.env.VITE_URL;

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);
    const [dataToken, setDataToken] = useState('');
    const [bauRegear, setBauRegear] = useState('');
    const [msgParaMembro, setMsgParaMembro] = useState('');

    const [imgCabeca, setImgCabeca] = useState("imgCima");
    const ClicoCabeca = ()=>{
        if(imgCabeca == 'imgCima'){
            setImgCabeca("imgCimaOff")
        }else{
            setImgCabeca("imgCima")
        }
    }

    const [imgPeito, setImgPeito] = useState("imgMeio");
    const ClicoPeito = ()=>{
        if(imgPeito == 'imgMeio'){
            setImgPeito("imgMeioOff")
        }else{
            setImgPeito("imgMeio")
        }
    }

    const [imgBotas, setImgBotas] = useState("imgBaixo")
    const ClicoBota = ()=>{
        if(imgBotas == 'imgBaixo'){
            setImgBotas("imgBaixoOff")
        }else{
            setImgBotas("imgBaixo")
        }
    }

    const [imgMainHand, setImgMainHand] = useState("imgMeio");
    const CligoMainHand = ()=>{
        if(imgMainHand == 'imgMeio'){
            setImgMainHand("imgMeioOff")
        }else{
            setImgMainHand("imgMeio")
        }
    }

    const [imgOffHand, setImgOffHand] = useState("imgMeio");
    const ClicoOffHand = ()=>{
        if(imgOffHand == 'imgMeio'){
            setImgOffHand("imgMeioOff")
        }else{
            setImgOffHand("imgMeio")
        }
    }

    const verificarToken = async()=>{
        setLoading(true);
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            setDataToken(data)
            if(data.res == 502){
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const getDetaRegear = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/regear/${idRegear}`);
            if(!res.ok){
                throw new Error('Erro na consulta da API getDetaRegear');
            }
            const data = await res.json();
            setDetaRegear(data);
            
            setTimeout(()=>{
                setLoading(false);
            }, 1000);
           
        } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        verificarToken();
        getDetaRegear();
    }, []);
    const aceitarRegear = async()=>{
        setLoading(true);

        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; 
        const year = now.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        
        const dataAceito = `${formattedDay}/${formattedMonth}/${year}`;
        const attRegear ={
            Responsavel:  dataToken.User,
            Status: "Aceito",
            DataAceito: dataAceito
        }
        try {
            const response = await fetch(`${BackURL}/api/regear/att/${detaRegear._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(attRegear)
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                atualizarPagina();
        } catch (error) {
            
        }
        toaster.push(
            <Notification type="success" header="Aceito" duration={5000} closable>
                <p>Solicitação acecita.</p>
            </Notification>
        ) 
        setTimeout(()=>{
   
            setLoading(false);                
            window.location.reload();
        }, 1000)
    }

    const FinalizarRegear = async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; 
        const year = now.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        console.log(msgParaMembro)
        
        
            const DataFinalizado = `${formattedDay}/${formattedMonth}/${year}`;
            const attRegear ={
                Status: "Finalizado",
                DataFinalizado: DataFinalizado,
                MsgStaff: msgParaMembro
            }
            try {
                const response = await fetch(`${BackURL}/api/regear/finalizar/${detaRegear._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(attRegear)
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    atualizarPagina();
            } catch (error) {
                console.error(error)
            }
            toaster.push(
                <Notification type="success" header="Finalizado" duration={5000} closable>
                    <p>Solicitação Finalizado.</p>
                </Notification>
            ) 
            setTimeout(()=>{    
                setLoading(false);                
                window.location.reload();
            }, 1000)
    }
    return (
        <div className={styles.pedio}>
            {loading ? (
                <div className={styles.Carregamento}>
                    <Loader style={{ color: 'black' }} center size="lg" speed="fast" content="Carregando..." />
                </div>
                
            ) : (                         
                <div className={styles.dados}>
                    <div className={styles[detaRegear.Status]}>
                        <p className={styles.StatusP}><strong>{detaRegear.Status}</strong></p>
                    </div>
                    <div className={styles.info}>
                        <p><strong>Solicitante:</strong> {detaRegear.Name}</p>
                        <p><strong>Responsavel:</strong> <strong>{detaRegear.Responsavel}</strong></p>
                        <p><strong>Fama da morte:</strong> {Number(detaRegear.Fama).toLocaleString('pt-BR')}</p>
                        <p className={styles.DadpsP}><strong>Data solicitada:</strong> {detaRegear.Data}</p>
                        <p><strong>Link da morte:</strong> <a href={`${detaRegear.Link}`} target="_blank">Acessar</a></p>
                        <p><strong>ID do re-gear:</strong> {detaRegear._id}</p>
                        
                    </div>
                    {dataToken.Cargo === "Membro" &&(
                        <div className={styles.divMembro}> 
                            {detaRegear.DataAceito !== "None" &&(
                                 <p className={styles.divStaffAceitoP}><strong>Pedido aceito em:</strong> {detaRegear.DataAceito}</p>
                            )}

                            {detaRegear.DataFinalizado !== "None" &&(
                                <p className={styles.divStaffAceitoP}><strong>Pedido finalizado em:</strong> {detaRegear.DataFinalizado}</p>
                            )}

                            {detaRegear.MsgStaff !== "Null" &&(
                                <div>
                                    <p className={styles.Msg}><strong>Mensagem da Staff:</strong></p>
                                    <p className={styles.Msg}>{detaRegear.MsgStaff}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {dataToken.Cargo === "Staff" && detaRegear.Status === "Pendente"&& (
                        <div className={styles.divStaff}> 
                            <button className={styles.BtnAceitar} onClick={aceitarRegear}>Aceitar</button>
                            <button className={styles.BtnRecusar}>Recusar</button>
                        </div>
                    )}

                    {dataToken.Cargo === "Staff" && detaRegear.Status === "Aceito"&& (
                        <div className={styles.divStaffAceito}>
                            <p className={styles.divStaffAceitoP}><strong>Data que o pedido foi aceito:</strong> {detaRegear.DataAceito}</p>
                            <p className={styles.divStaffAceitoP}><strong>Deixe sua mensagem:</strong></p>
                            <div className={styles.divMsgStaff}>
                                <textarea className={styles.msgStaffParaMembro} rows="4" placeholder='Deixe sua mensagem aqui...' value={msgParaMembro} onChange={e => setMsgParaMembro(e.target.value)}/>
                                <button className={styles.FinalizarRegear} onClick={FinalizarRegear}>Finalizar</button>
                            </div>                          
                        </div>
                    )}

                    {dataToken.Cargo === "Staff" && detaRegear.Status === "Finalizado"&& ( 
                        <div className={styles.divStaffFinalizado}>
                            <p className={styles.divStaffAceitoP}><strong>Pedido criado em:</strong> {detaRegear.Data}</p>
                            <p className={styles.divStaffAceitoP}><strong>Pedido aceito em:</strong> {detaRegear.DataAceito}</p>
                            <p className={styles.divStaffAceitoP}><strong>Pedido finalizado em:</strong> {detaRegear.DataFinalizado}</p>

                            {detaRegear.MsgStaff !== "Null" &&(
                                <div>
                                    <p className={styles.Msg}><strong>Mensagem da Staff:</strong></p>
                                    <p className={styles.Msg}>{detaRegear.MsgStaff}</p>
                                </div>
                            )}  
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <div className={styles.Carregamento}>
                    <Loader style={{ color: 'black' }} center size="lg" speed="fast" content="Carregando..." />
                </div>                
            ) : (                         
                <div className={styles.set}>
                        <div className={styles.equipamentos}>

                            <div className={styles.setCima}>
                                <div className={styles.divCima}>
                                    {detaRegear.Bolsa === "Null" ? (
                                        <img src={CertoVerde} alt="" className={styles.imgCima}/>
                                        
                                    ):(
                                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Bolsa}`} alt="" className={styles.imgCima}/>
                                    )}
                                    
                                </div>
                                <div className={styles.divCima}>
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.Cabeca}`} alt="" className={styles[imgCabeca]} onClick={ClicoCabeca}/>
                                </div>
                                <div className={styles.divCima}>
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.Capa}`} alt="" className={styles.imgCima}/>
                                </div>
                            </div>

                            <div className={styles.setMeio}>
                                <div className={styles.divMeio}>
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.MainHand}`} alt="" className={styles[imgMainHand]} onClick={CligoMainHand}/>
                                </div>
                                <div className={styles.divMeio}>
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.Peitoral}`} alt="" className={styles[imgPeito]} onClick={ClicoPeito}/>
                                </div>
                                <div className={styles.divMeio}>
                                {detaRegear.OffHand === "Null" ? (
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.MainHand}`} alt="" className={styles[imgMainHand]} onClick={CligoMainHand}/>
                                ):(
                                    <img 
                                        src={`https://render.albiononline.com/v1/item/${detaRegear.OffHand}`} 
                                        alt="" 
                                        className={styles[imgOffHand]}
                                        onClick={ClicoOffHand}
                                    />
                                )}
                                </div>
                            </div>

                            <div className={styles.setBaixo}>
                                <div className={styles.divBaixo}>
                                    <img src={LaMuerte} alt="" className={styles.imgBaixo}/>
                                </div>
                                <div className={styles.divBaixo}>
                                    <img src={`https://render.albiononline.com/v1/item/${detaRegear.Bota}`} alt="" className={styles[imgBotas]} onClick={ClicoBota}/>
                                </div>
                                <div className={styles.divBaixo}>
                                    <img src={LaMuerte} alt="" className={styles.imgBaixo}/>
                                </div>
                            </div>
                        </div>

                </div>
            )}
            
        </div>
    )
};

export default Pedidos;