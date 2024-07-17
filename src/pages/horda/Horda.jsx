import CustomSidenav  from "../../../components/Nav/Nav.jsx";
import styles from "./HordaStyle.module.css"; // Importação do CSS Module
const Horda = () => {

    return (
        <div className={styles.Horda}>
            <CustomSidenav/>
        </div>
    )
};

export default Horda;