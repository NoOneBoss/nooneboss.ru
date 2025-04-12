import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import './styles/global.css';

const App = () => {
    return (
        <>
            <Header />
            <div className="container">
                <main>
                    <About />
                    <Contact />
                </main>
            </div>
        </>
    );
};

export default App;