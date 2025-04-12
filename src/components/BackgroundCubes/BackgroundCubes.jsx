// components/BackgroundCubes/BackgroundCubes.jsx
import { useEffect, useRef, useState } from 'react';
import { techIcons } from '../About/About';
import styles from './BackgroundCubes.module.css';

// Хук для определения мобильных устройств
const useMobileDetect = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth < 768 ||
                navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
            setIsMobile(isMobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const CUBE_COUNT = 50;
const MOUSE_FORCE = 0.15;
const SPEED_FACTOR = 0.15;

const BackgroundCubes = () => {
    const cubesRef = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);
    const isMobile = useMobileDetect();

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            cubesRef.current.forEach((cube) => {
                if (!cube) return;

                const data = cube.dataset;
                let x = parseFloat(data.x);
                let y = parseFloat(data.y);
                let vx = parseFloat(data.vx);
                let vy = parseFloat(data.vy);

                // Взаимодействие с курсором
                const dx = mousePos.current.x - x;
                const dy = mousePos.current.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const force = MOUSE_FORCE * (1 - distance / 120);
                    vx += (-dx / distance) * force;
                    vy += (-dy / distance) * force;
                }

                x += vx;
                y += vy;

                if (x < 0 || x > window.innerWidth - 60) {
                    vx *= -0.82;
                    x = Math.max(0, Math.min(x, window.innerWidth - 60));
                }
                if (y < 0 || y > window.innerHeight - 60) {
                    vy *= -0.82;
                    y = Math.max(0, Math.min(y, window.innerHeight - 60));
                }

                cube.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          rotateX(${x * 0.4}deg)
          rotateY(${y * 0.4}deg)
        `;

                data.x = x;
                data.y = y;
                data.vx = vx;
                data.vy = vy;
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const handleResize = () => {
            cubesRef.current.forEach(cube => {
                if (!cube) return;
                cube.dataset.x = Math.min(
                    parseFloat(cube.dataset.x),
                    window.innerWidth - 60
                );
                cube.dataset.y = Math.min(
                    parseFloat(cube.dataset.y),
                    window.innerHeight - 60
                );
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div className={styles.container}>
            {Array.from({ length: CUBE_COUNT }).map((_, i) => {
                const techKeys = Object.keys(techIcons);
                const shuffledTechs = [...techKeys].sort(() => Math.random() - 0.5);
                const selectedTechs = shuffledTechs.slice(0, 6);

                return (
                    <div
                        key={i}
                        ref={el => cubesRef.current[i] = el}
                        className={styles.cube}
                        data-x={Math.random() * (window.innerWidth - 60)}
                        data-y={Math.random() * (window.innerHeight - 60)}
                        data-vx={(Math.random() - 0.5) * SPEED_FACTOR}
                        data-vy={(Math.random() - 0.5) * SPEED_FACTOR}
                    >
                        {selectedTechs.map((tech, j) => (
                            <div key={`${i}-${j}`} className={styles[`face${j}`]}>
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