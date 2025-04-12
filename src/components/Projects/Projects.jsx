import { useState } from 'react';
import styles from './Projects.module.css';
import { techIcons } from '../About/About';

const projectsData = [
    {
        title: "HighLoad Framework",
        description: "Фреймворк для распределённых вычислений с использованием акторной модели",
        tech: ['Java', 'Docker', 'Jenkins'],
        links: {
            github: "https://github.com/example1",
            demo: "https://demo.example1.com"
        }
    },
    {
        title: "Performance Testing Suite",
        description: "Комплекс инструментов для нагрузочного тестирования на базе K6 и Grafana",
        tech: ['K6', 'Grafana', 'Python'],
        links: {
            github: "https://github.com/example2",
            demo: "https://demo.example2.com"
        }
    },
    {
        title: "CI/CD Pipeline",
        description: "Кастомная система непрерывной интеграции для микросервисной архитектуры",
        tech: ['Gitlab CI', 'Docker', 'Jenkins'],
        links: {
            github: "https://github.com/example3",
            demo: "https://demo.example3.com"
        }
    },
];

const Projects = () => {
    const [selectedTech, setSelectedTech] = useState('all');
    const allTechnologies = [...new Set(projectsData.flatMap(p => p.tech))];

    const filteredProjects = selectedTech === 'all'
        ? projectsData
        : projectsData.filter(p => p.tech.includes(selectedTech));

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2>Проекты</h2>

                <div className={styles.filters}>
                    <button
                        onClick={() => setSelectedTech('all')}
                        className={`${styles.filterButton} ${selectedTech === 'all' ? styles.active : ''}`}
                    >
                        Все
                    </button>
                    {allTechnologies.map(tech => (
                        <button
                            key={tech}
                            onClick={() => setSelectedTech(tech)}
                            className={`${styles.filterButton} ${selectedTech === tech ? styles.active : ''}`}
                        >
                            {techIcons[tech]}
                            {tech}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredProjects.map((project, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.content}>
                                <h3>{project.title}</h3>
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
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            Демо
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;