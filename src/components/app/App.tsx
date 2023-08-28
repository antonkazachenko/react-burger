import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ingredients from "../../utils/ingredients";




function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <div className={styles.tabWidth} >
          <BurgerIngredients/>
        </div>
        <div className={styles.tabWidth}>
          <BurgerConstructor ingredientsDisplay={ingredients} className={`mt-25 ml-10 ${styles.flexColumn}`}/>
        </div>
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
