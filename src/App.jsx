import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import BackgroundCubes from './components/BackgroundCubes/BackgroundCubes';
import './styles/global.css';

const App = () => {
    return (
        <>
            <BackgroundCubes />
            <Header />
            <main className="main-container">
                <About />
                <Projects />
                <Contact />
            </main>
        </>
    );
};

export default App;