
import styles from './Header.module.css';
import { Link } from 'react-scroll';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.profileWrapper}>
                    <img
                        src="/icon.png"
                        alt="Avatar"
                        className={styles.avatar}
                    />
                    <div className={styles.titleContainer}>
                        <h1>nooneboss</h1>
                        <p className={styles.subtitle}>или ноуванбосс?</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <Link
                        to="about"
                        spy={true}
                        smooth={true}
                        className={styles.navLink}
                    >
                        Обо мне
                    </Link>
                    <Link
                        to="projects"
                        spy={true}
                        smooth={true}
                        className={styles.navLink}
                    >
                        Проекты
                    </Link>
                    <Link
                        to="contact"
                        spy={true}
                        smooth={true}
                        className={styles.navLink}
                    >
                        Контакты
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;