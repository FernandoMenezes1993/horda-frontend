import React, { useState } from 'react';

import VisibleIcon from '@rsuite/icons/Visible';
import { Dropdown } from 'rsuite';

import styles from "./TabelaStaffStyle.module.css"

function TabelaStaff({ regears, token }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroResponsavel, setFiltroResponsavel] = useState(""); // Novo estado para filtrar por responsável

    const chamarRegear = (solicitacao) => {
        const url = `/pedido?q=${token}&w=${solicitacao._id}`;
        window.open(url, '_blank');
    };

    // Filtrando os regears com base no nome digitado e no responsável selecionado
    const regearsFiltrados = regears.filter(regear =>
        regear.Name.toLowerCase().includes(filtroNome.toLowerCase()) &&
        (filtroResponsavel === "" || regear.Responsavel === filtroResponsavel)
    );

    // Cálculo de páginas com base nos itens filtrados
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const solicitaçõesAtuais = regearsFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const totalPaginas = Math.ceil(regearsFiltrados.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    const VerPedido = (id) => {
        const url = `/pedido?q=${token}&id=${id}`;
        window.open(url, '_blank');
    }

    const pgRegearAlbion = (KillBoard) => {
        window.open(KillBoard, '_blank');
    }

    // Extraindo todos os responsáveis únicos para o dropdown
    const responsaveisDisponiveis = [...new Set(regears.map(regear => regear.Responsavel))];

    return (
        <div className={styles.tabelaMembro}>
            
            <div className={styles.filtroContainer}>
                <div className={styles.filtroSolicitante}>
                    <Dropdown 
                        title={filtroResponsavel || "Selecionar responsável"} 
                        onSelect={setFiltroResponsavel}
                        className={styles.dropdownFiltro}
                    >
                        <Dropdown.Item eventKey="">Todos</Dropdown.Item>
                        {responsaveisDisponiveis.map(responsavel => (
                            <Dropdown.Item key={responsavel} eventKey={responsavel}>
                                {responsavel}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
                
                <div className={styles.filtroNome}>
                    <span className={styles.Solicitante}>Solicitante</span>
                    <input 
                        type="text" 
                        placeholder="Filtrar por nome" 
                        value={filtroNome} 
                        onChange={(e) => setFiltroNome(e.target.value)} 
                        className={styles.inputFiltro}
                    />
                </div>                
            </div>

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
                    </tr>
                </thead>

                <tbody className={styles.TabelaLinhas}>
                    {solicitaçõesAtuais
                        .map(regear => (
                            <tr key={regear._id}>
                                <td className={styles.TabelaTD}>{regear.Data}</td>
                                <td className={styles.TabelaTD}>{regear.Name}</td>
                                <td className={styles.TabelaTD}>{regear.Responsavel}</td>
                                <td className={styles.TabelaTD}><span className={styles[regear.Status]}>{regear.Status}</span></td>
                                <td className={styles.TabelaTDKillBoard} onClick={() => pgRegearAlbion(regear.Link)}>Kill Board</td>
                                <td className={styles.TabelaTDIcon} onClick={() => VerPedido(regear._id)}><VisibleIcon className={styles.icons}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>             
        </div>  
    );
}

export default TabelaStaff;