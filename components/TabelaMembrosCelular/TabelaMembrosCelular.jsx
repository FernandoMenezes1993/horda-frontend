import React, { useState } from 'react';

import VisibleIcon from '@rsuite/icons/Visible';
import TrashIcon from '@rsuite/icons/Trash';

import { Notification, useToaster } from 'rsuite';

import styles from "./TabelaMembrosCelularStyle.module.css";

function TabelaMembrosCelular({ regears, token }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(12);
    const toaster = useToaster(); 
    const BackURL = import.meta.env.VITE_URL;

    const chamarRegear = (solicitacao) => {
        const url = `/pedido?q=${token}&w=${solicitacao._id}`;
        window.open(url, '_blank');
    };

    // Filtrar regears para excluir os com status "Resgatado"
    const regearsFiltrados = regears.filter(regear => regear.Status !== "Resgatado");

    // Cálculo de páginas
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const solicitaçõesAtuais = regearsFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const totalPaginas = Math.ceil(regearsFiltrados.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    const DeletarPedido = async (id, Status) => {
        if (Status === "Finalizado" || Status === "Negado") {
            const attRegear = {
                Status: "Resgatado"
            };
            try {
                const response = await fetch(`${BackURL}/api/resgatado/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(attRegear)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(response);

            } catch (error) {
                console.error(error);
            }
            toaster.push(
                <Notification type="success" header="Deletado" duration={5000} closable>
                    <p>Pedido deletado com sucesso!</p>
                </Notification>
            ) 
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } else {
            toaster.push(
                <Notification type="error" header="Erro" duration={5000} closable>
                    <p>Apenas pedidos finalizados e negado podem ser deletados</p>
                </Notification>
            )
        }
    };

    const VerPedido = (id) => {
        const url = `/pedido?q=${token}&id=${id}`;
        window.open(url, '_blank');
    };

    const pgRegearAlbion = (KillBoard) => {
        window.open(KillBoard, '_blank');
    };

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
                        <th className={styles.TabelaTH}>Responsável</th>
                        <th className={styles.TabelaTH}>Status</th>
                        <th className={styles.TabelaTHIcon}>Ver</th>
                        <th className={styles.TabelaTHIcon}>Deletar</th>
                    </tr>
                </thead>
                <tbody className={styles.TabelaLinhas}>
                    {solicitaçõesAtuais
                        .map(regear => (
                            <tr key={regear._id}>
                                <td className={styles.TabelaTD}>{regear.Data}</td>
                                <td className={styles.TabelaTD}>{regear.Responsavel}</td>
                                <td className={styles.TabelaTD}><span className={styles[regear.Status]}>{regear.Status}</span></td>
                                <td className={styles.TabelaTDIcon} onClick={() => VerPedido(regear._id)}><VisibleIcon className={styles.icons} /></td>
                                <td className={styles.TabelaTDIcon} onClick={() => DeletarPedido(regear._id, regear.Status)}><TrashIcon className={styles.icons} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TabelaMembrosCelular;