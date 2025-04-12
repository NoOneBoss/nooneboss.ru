import styles from './Header.module.css';

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
            </div>
        </header>
    );
};

export default Header;