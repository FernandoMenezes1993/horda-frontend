import { Sidenav, Nav } from 'rsuite';
import ToolsIcon from '@rsuite/icons/Tools';
import PageIcon from '@rsuite/icons/Page';
import AdminIcon from '@rsuite/icons/Admin';
import styles from "./NavStyle.module.css";

function CustomSidenav ( ){  

    return(
        <div style={{ width: 240 }}>
            <Sidenav 
                style={{height: '100vh', overflow: 'hidden'}}
                defaultOpenKeys={['3', '4']}
            >
            <Sidenav.Body>
                <Nav activeKey="1">
                <Nav.Item eventKey="1" icon={<ToolsIcon  />}>
                    Re-gear
                </Nav.Item>
                <Nav.Item eventKey="1" icon={<PageIcon  />}>
                    Black List
                </Nav.Item>
                
                <Nav.Menu eventKey="3" title="Staff" icon={<AdminIcon />}>
                    <Nav.Item eventKey="3-1">Re-gears</Nav.Item>
                    <Nav.Item eventKey="3-2">Cargos</Nav.Item>
                    <Nav.Item eventKey="3-3">Black List</Nav.Item>
                </Nav.Menu>
                
                </Nav>
                
            </Sidenav.Body>
            </Sidenav>
        </div>       
    )
}

export default CustomSidenav;