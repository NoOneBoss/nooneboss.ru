import styles from './Contact.module.css';
import { FaTelegramPlane, FaGithub, FaVk } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.links}>
                <a href="https://t.me/NoOneBoss322" className={styles.link}>
                    <FaTelegramPlane className={styles.icon} />
                </a>
                <a href="https://github.com/NoOneBoss" className={styles.link}>
                    <FaGithub className={styles.icon} />
                </a>
                <a href="https://vk.com/nooneb0ss" className={styles.link}>
                    <FaVk className={styles.icon} />
                </a>
            </div>
        </section>
    );
};

export default Contact;