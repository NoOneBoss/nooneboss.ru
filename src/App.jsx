import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
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
                <Contact />
            </main>
        </>
    );
};

export default App;