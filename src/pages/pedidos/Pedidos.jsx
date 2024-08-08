import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';

import { Loader } from 'rsuite';
import LaMuerte  from "../../../public/img/icon/LaMuerte.png"
import CertoVerde from "../../../public/img/icon/PedidoCerto.png"

import styles from "./PedidosStyle.module.css"; 

const Pedidos = () => {
    const[loading, setLoading] = useState(false);
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();

    const BackURL = import.meta.env.VITE_URL;

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);
    const [dataToken, setDataToken] = useState('');

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
       
    return (
        <div className={styles.pedio}>
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
                <div className={styles.valores}>

                </div>

            </div>
            <div className={styles.dados}>

            </div>            
        </div>
    )
};

export default Pedidos;