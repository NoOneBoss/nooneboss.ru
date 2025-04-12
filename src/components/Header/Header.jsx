import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h1>nooneboss</h1>
                <p>Developer</p>
            </div>
        </header>
    );
};

export default Header;