import styles from './Contact.module.css';

const Contact = () => {
    return (
        <section className={styles.contact}>
            <h2>Контакты</h2>
            <div className={styles.links}>
                <a href="https://t.me/NoOneBoss322" className={styles.link}>
                    📱 Telegram
                </a>
            </div>
        </section>
    );
};

export default Contact;