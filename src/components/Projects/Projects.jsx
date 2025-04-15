import { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import { techIcons } from '../About/About';

const projectsData = [
    {
        title: "k6-minecraft",
        description: "Проект для нагрузочного тестирования Minecraft-серверов с использованием кастомного расширения K6-Minecraft-VUser на Go. Включает контейнеризированное окружение с Docker и Docker Compose.",
        tech: ['K6', 'Docker', 'Go'],
        links: {
            github: "https://github.com/NoOneBoss/k6-minecraft",
        },
        video: "/videos/bot-demo.mp4"
    },
    {
        title: "K6-MinecraftVUser",
        description: "Расширение для k6 (xk6) для создания ботов Minecraft с функциями подключения к серверу, обработки игровых событий и интеграции с нагрузочными тестами.",
        tech: ['Go', 'K6', 'Minecraft'],
        links: {
            github: "https://github.com/NoOneBoss/K6-Minecraft-VUser",
        },
        video: "/videos/bot-demo.mp4"
    }
];

const Projects = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [animationClass, setAnimationClass] = useState('active');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let interval;
        if (autoPlay && !isAnimating) {
            interval = setInterval(() => {
                handleNavigation('next');
            }, 10000);
        }
        return () => clearInterval(interval);
    }, [autoPlay, isAnimating]);

    const handleNavigation = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setAnimationClass(direction);

        setTimeout(() => {
            setCurrentProjectIndex(prev =>
                direction === 'prev'
                    ? prev === 0 ? projectsData.length - 1 : prev - 1
                    : (prev + 1) % projectsData.length
            );
            setAnimationClass('active');
            setIsAnimating(false);
        }, 600);
    };

    const project = projectsData[currentProjectIndex];

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2>Проекты</h2>

                <div className={styles.carousel}>
                    <button
                        className={styles.arrowButton}
                        onClick={() => handleNavigation('prev')}
                        aria-label="Previous project"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                        </svg>
                    </button>

                    <div
                        key={currentProjectIndex}
                        className={`${styles.mainCard} ${styles[animationClass]}`}
                    >
                        <div className={styles.content}>
                            <h3>{project.title}</h3>
                            <div className={styles.cardBody}>
                                <div className={styles.textContent}>
                                    <p className={styles.description}>{project.description}</p>
                                    <div className={styles.techStack}>
                                        {project.tech.map(tech => (
                                            <span key={tech} className={styles.tech}>
                                                {techIcons[tech]}
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={styles.links}>
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.videoContainer}>
                                    <video
                                        className={styles.demoVideo}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    >
                                        <source src={project.video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className={styles.arrowButton}
                        onClick={() => handleNavigation('next')}
                        aria-label="Next project"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;