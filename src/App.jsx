import React from 'react';
import Header from './components/Header/Header';
import Contact from './components/Contact/Contact';
import './styles/global.css';

const App = () => {
  return (
      <div className="container">
        <Header />
        <main>
          <section id="about">
            <h2>Обо мне</h2>
            <p>разработчик</p>
          </section>
          <Contact />
        </main>
      </div>
  );
};

export default App;