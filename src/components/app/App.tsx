import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <main>
        <div className={styles.tabWidth} >
          <BurgerIngredients />
        </div>
        {/*<div className={styles.tabWidth} >*/}
        {/*  <BurgerIngredients />*/}
        {/*</div>*/}
      </main>
    </div>
  );
}

export default App;

// <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
