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
                    <Link to='/new' className={styles.navLinks}>New Todo</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav