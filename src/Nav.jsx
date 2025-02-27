import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function Nav() {
    return (
        <nav className={styles.navContainer}>
            <ul className={styles.navList}>
                <li>
                    <Link to='/' className={styles.navLinks}>Home</Link>
                </li>
                <li>
                    <Link to='/main' className={styles.navLinks}>Main Todos</Link>
                </li>
                <li>
                    <Link to='/others' className={styles.navLinks}>For Later</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav