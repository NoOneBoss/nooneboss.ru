import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import {
    FaJava,
    FaPython,
    FaDocker,
    FaGitlab,
    FaUnity,
    FaCode
} from 'react-icons/fa';
import { SiSharp, SiGrafana, SiJenkins, SiApachejmeter, SiK6 } from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';

const skillLevels = {
    'Java': 70,
    'Kotlin': 80,
    'Docker': 60,
    'Jenkins': 60,
    'Python': 40,
    'PostgreSQL': 50,
    'Gitlab CI': 60,
    'Apache JMeter': 90,
    'K6':10,
    'Unity':60,
    'Grafana': 50,
    'C#': 60
};

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
    const progressBarsRef = useRef([]);
    const sectionRef = useRef();
    const mainTech = ['Java', 'Kotlin', 'C#', 'Unity', 'Apache JMeter', 'PostgreSQL', 'Jenkins', 'Docker'];
    const otherTech = ['Python', 'K6', 'Grafana', 'Gitlab CI'];

    useEffect(() => {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = `${progress}%`;
                }
            });
        }, { threshold: 0.5 });

        progressBarsRef.current.forEach(bar => bar && progressObserver.observe(bar));

        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.inView);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }

        return () => {
            progressObserver.disconnect();
            sectionObserver.disconnect();
        };
    }, []);

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>Обо мне</h2>
                    <p className={styles.description}>
                        Инженер-разработчик с фокусом на создании высоконагруженных систем.
                        Основные направления: backend-разработка, нагрузочное тестирование
                        и DevOps-практики. Опыт в полном цикле разработки: от проектирования
                        архитектуры до мониторинга в production-среде.
                    </p>

                    <div className={styles.skillsSection}>
                        <h3>Ключевые навыки</h3>
                        <div className={styles.skillsGrid}>
                            {mainTech.map((tech, index) => (
                                <div key={tech} className={styles.skillItem}>
                                    <div className={styles.skillHeader}>
                                        {techIcons[tech]}
                                        <span>{tech}</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            ref={el => progressBarsRef.current[index] = el}
                                            className={styles.progress}
                                            data-progress={skillLevels[tech]}
                                        ></div>
                                        <span className={styles.percentage}>{skillLevels[tech]}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.techSection}>
                        <h3>Дополнительные технологии</h3>
                        <div className={styles.techGrid}>
                            {otherTech.map((tech, index) => (
                                <div key={index} className={styles.techItem}>
                                    {techIcons[tech]}
                                    <span>{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;