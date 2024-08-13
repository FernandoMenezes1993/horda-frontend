import { Sidenav, Nav } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';

import ToolsIcon from '@rsuite/icons/Tools';
import PageIcon from '@rsuite/icons/Page';
import AdminIcon from '@rsuite/icons/Admin';
import styles from "./NavStyle.module.css";

function CustomSidenav ( { Cargo, pg, Nome, token } ){  
    const navigate = useNavigate();

    const irPedidosStaff =()=>{
        navigate(`/staff?q=${token}`);
    }
    const irParaRegear= ()=>{
        navigate(`/horda?q=${token}`);
    }
    return(
        <div style={{ width: 240 }} className={styles.Navegador}>
            <Sidenav 
                style={{height: '99vh', overflow: 'hidden'}}
                defaultOpenKeys={['3', '4']}
            >
            <div className={styles.NomeJogador}>
                {Nome}
            </div>
            <Sidenav.Body>
                <Nav activeKey="1">

                <Nav.Item eventKey="1" icon={<ToolsIcon  />}>
                    <div 
                    className={styles.navItemContent}
                    onClick={irParaRegear}
                    >
                        Re-gear
                        {pg === "Horda" && (
                            <img src="/img/HordaIcon.png" alt="" className={styles.iconHorda}/>
                        )}                        
                    </div>
                </Nav.Item>

                <Nav.Item eventKey="1" icon={<PageIcon  />}>                    
                    <div className={styles.navItemContent}>
                        Black List
                        {pg === "BlackList" && (
                            <img src="/img/HordaIcon.png"  alt="" className={styles.iconHorda}/>
                        )}                        
                    </div>
                </Nav.Item>
                
                {Cargo === "Staff" &&(
                    <Nav.Menu eventKey="3" title="Staff" icon={<AdminIcon />}>
                        <Nav.Item eventKey="3-1">                        
                            <div 
                            className={styles.navItemContent}
                            onClick={irPedidosStaff}
                            >
                                Re-gears
                                {pg === "PedidosStaff" && (
                                    <img src="/img/HordaIcon.png" alt="" className={styles.iconHorda}/>
                                )}                        
                            </div>
                        </Nav.Item>
                        <Nav.Item eventKey="3-2">                        
                            <div className={styles.navItemContent}>
                                Cargos
                                {pg === "Cargos" && (
                                    <img src="/img/HordaIcon.png" alt="" className={styles.iconHorda}/>
                                )}                        
                            </div>
                        </Nav.Item>
                        <Nav.Item eventKey="3-3">
                            
                            <div className={styles.navItemContent}>
                                Black List
                                {pg === "BlackListStaff" && (
                                    <img src="/img/HordaIcon.png" alt="" className={styles.iconHorda}/>
                                )}                        
                            </div>
                        </Nav.Item>
                    </Nav.Menu>
                )}
                    
                
                </Nav>
                
            </Sidenav.Body>
            </Sidenav>
        </div>       
    )
}

export default CustomSidenav;