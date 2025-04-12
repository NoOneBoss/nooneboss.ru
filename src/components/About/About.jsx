import styles from './About.module.css';
import {
    FaJava,
    FaPython,
    FaDocker,
    FaGitlab,
    FaServer,
    FaChartLine,
    FaDatabase,
    FaTerminal,
    FaUnity,
    FaCode
} from 'react-icons/fa';
import { SiSharp, SiGrafana, SiJenkins, SiApachejmeter, SiK6 } from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';

// Сопоставление иконок с технологиями
export const techIcons = {
    'Kotlin': <FaCode className={styles.icon} />,
    'Java': <FaJava className={styles.icon} />,
    'C#': <SiSharp className={styles.icon} />,
    'Python': <FaPython className={styles.icon} />,
    'Unity': <FaUnity className={styles.icon} />,
    'Apache JMeter': <SiApachejmeter className={styles.icon} />,
    'K6': <SiK6 className={styles.icon} />,
    'Grafana': <SiGrafana className={styles.icon} />,
    'PostgreSQL': <DiPostgresql className={styles.icon} />,
    'Jenkins': <SiJenkins className={styles.icon} />,
    'Gitlab CI': <FaGitlab className={styles.icon} />,
    'Docker': <FaDocker className={styles.icon} />,
};

const About = () => {
    const techStack = ['Kotlin', 'Java', 'C#', 'Python', 'Unity', 'Apache JMeter', 'K6', 'Grafana', 'PostgreSQL', 'Jenkins', 'Gitlab CI', 'Docker'];

    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>Обо мне</h2>
                    <p className={styles.description}>
                        Инженер-разработчик с фокусом на создании высоконагруженных систем.
                        Основные направления: backend-разработка, нагрузочное тестирование
                        и DevOps-практики. Опыт в полном цикле разработки: от проектирования
                        архитектуры до мониторинга в production-среде.
                    </p>
                    <div className={styles.techGrid}>
                        {techStack.map((tech, index) => (
                            <div key={index} className={styles.techItem}>
                                {techIcons[tech]}
                                <span>{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;