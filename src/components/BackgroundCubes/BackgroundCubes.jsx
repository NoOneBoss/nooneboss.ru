// components/BackgroundCubes/BackgroundCubes.jsx
import { useEffect, useRef } from 'react';
import { techIcons } from '../About/About';
import styles from './BackgroundCubes.module.css';

const CUBE_COUNT = 50;
const MOUSE_FORCE = 0.1;
const SPEED_FACTOR = 0.1;

const BackgroundCubes = () => {
    const cubesRef = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            cubesRef.current.forEach(cube => {
                if (!cube) return;

                // Ограничиваем позиции в новых границах
                cube.dataset.x = Math.min(parseFloat(cube.dataset.x), window.innerWidth - 60);
                cube.dataset.y = Math.min(parseFloat(cube.dataset.y), window.innerHeight - 60);
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            cubesRef.current.forEach((cube, index) => {
                if (!cube) return;

                const x = parseFloat(cube.dataset.x);
                const y = parseFloat(cube.dataset.y);
                const vx = parseFloat(cube.dataset.vx);
                const vy = parseFloat(cube.dataset.vy);

                const dx = mousePos.current.x - x;
                const dy = mousePos.current.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = MOUSE_FORCE * (1 - distance / 150);
                    const ax = (-dx / distance) * force;
                    const ay = (-dy / distance) * force;
                    cube.dataset.vx = vx + ax;
                    cube.dataset.vy = vy + ay;
                }

                const newX = x + vx;
                const newY = y + vy;

                if (newX < 0 || newX > window.innerWidth) cube.dataset.vx = -vx * 0.8;
                if (newY < 0 || newY > window.innerHeight) cube.dataset.vy = -vy * 0.8;

                cube.style.transform = `translate3d(${newX}px, ${newY}px, 0) 
          rotateX(${x * 0.5}deg) 
          rotateY(${y * 0.5}deg)`;
                cube.dataset.x = newX;
                cube.dataset.y = newY;
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div className={styles.container}>
            {Array.from({ length: CUBE_COUNT }).map((_, i) => {
                // Выбираем 6 уникальных иконок для всех граней
                const allTechs = Object.keys(techIcons);
                const shuffledTechs = [...allTechs].sort(() => Math.random() - 0.5);
                const selectedTechs = shuffledTechs.slice(0, 6);

                return (
                    <div
                        key={i}
                        ref={el => cubesRef.current[i] = el}
                        className={styles.cube}
                        data-x={Math.random() * window.innerWidth}
                        data-y={Math.random() * window.innerHeight}
                        data-vx={(Math.random() - 0.5) * SPEED_FACTOR}
                        data-vy={(Math.random() - 0.5) * SPEED_FACTOR}
                    >
                        {/* Рендерим все 6 граней */}
                        {selectedTechs.map((tech, j) => (
                            <div key={j} className={styles[`face${j}`]}>
                                {techIcons[tech]}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default BackgroundCubes;