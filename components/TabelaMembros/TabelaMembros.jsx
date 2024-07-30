import React, { useState } from 'react';

import VisibleIcon from '@rsuite/icons/Visible';
import TrashIcon from '@rsuite/icons/Trash';

import styles from "./TabelaMembrosStyle.module.css"

function TabelaMembros( { regears, token }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(12);

    const chamarRegear = (solicitacao) => {
        const url = `/pedido?q=${token}&w=${solicitacao._id}`;
        window.open(url, '_blank');
    };

    // Cálculo de páginas
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const solicitaçõesAtuais = regears.slice(indexOfFirstItem, indexOfLastItem);

    const totalPaginas = Math.ceil(regears.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    const DeletarPedido = (id)=>{
        alert(`Vamos deletar o pedido ${id}`);
    }

    const VerPedido = (id)=>{
        const url = `/pedido?q=${token}&id=${id}`;
        window.open(url, '_blank');

    }

    const pgRegearAlbion =(KillBoard)=>{
        window.open(KillBoard, '_blank');
    }
    return (          
        <div className={styles.tabelaMembro}>
            <div className={styles.buttonPaginacao}>
                {[...Array(totalPaginas).keys()].map(num => (
                    <button key={num} onClick={() => mudarPagina(num + 1)} className={paginaAtual === num + 1 ? "active" : ""}>
                        {num + 1}
                    </button>
                ))}
            </div> 
            <table className={styles.tabelaDados}>
                <thead>
                    <tr>
                        <th className={styles.TabelaTH}>Data</th>
                        <th className={styles.TabelaTH}>Solicitante</th>
                        <th className={styles.TabelaTH}>Responsável</th>
                        <th className={styles.TabelaTH}>Status</th>
                        <th className={styles.TabelaTH}>Albion</th>
                        <th className={styles.TabelaTHIcon}>Pedido</th>
                        <th className={styles.TabelaTHIcon}>Deletar</th>
                    </tr>
                </thead>

                <tbody className={styles.TabelaLinhas}>
                    {solicitaçõesAtuais
                        .map(regear =>(
                            <tr key={regear._id} >
                                <td className={styles.TabelaTD}>{regear.Data}</td>
                                <td className={styles.TabelaTD}>{regear.Name}</td>
                                <td className={styles.TabelaTD}>{regear.Responsavel}</td>
                                <td className={styles.TabelaTD}><span className={styles[regear.Status]}>{regear.Status}</span></td>
                                <td className={styles.TabelaTDKillBoard} onClick={()=> pgRegearAlbion(regear.Link)}>Kill Board</td>
                                <td className={styles.TabelaTDIcon} onClick={() => VerPedido(regear._id)}><VisibleIcon className={styles.icons}/></td>
                                <td className={styles.TabelaTDIcon} onClick={() => DeletarPedido(regear._id)}><TrashIcon className={styles.icons}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>             
        </div>  
    );
}

export default TabelaMembros;