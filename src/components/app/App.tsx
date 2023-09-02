import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import apiLink from "../../utils/api";


type DataType = {
  bread: {
    class: string;
    counterCheck: boolean;
    item: any;
    price: number;
  }[];
  sauces: {
    class: string;
    counterCheck: boolean;
    item: any;
    price: number;
  }[];
  main: any[];
};

function App() {
  const [data, setData] = React.useState<DataType>({
    bread: [],
    sauces: [],
    main: []
  })

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getProductData = async () => {
      const res = await fetch(apiLink);
      const dataResp = await res.json();
      setData({
        bread: [{
          class: `ml-4 ${styles.relative}`,
          counterCheck: true,
          item: dataResp.data[0],
          price: 20
        },
          {
            class: "ml-6",
            counterCheck: false,
            item: dataResp.data[7],
            price: 20
          }],
        sauces: [{
          class: "ml-4",
          counterCheck: false,
          item: dataResp.data[3],
          price: 30
        },
          {
            class: "ml-6",
            counterCheck: false,
            item: dataResp.data[4],
            price: 30
          },
          {
            class: `ml-4 mt-8 ${styles.relative}`,
            counterCheck: true,
            item: dataResp.data[8],
            price: 30
          },
          {
            class: "ml-6 mt-8",
            counterCheck: false,
            item: dataResp.data[9],
            price: 30
          }],
        main: dataResp.data
      });
      setIsLoading(false);
    }

    getProductData()
      .catch((e) => console.log(e));
  }, [])
  if (!isLoading) {
    return (
      <div className={styles.app}>
        <AppHeader/>
        <main>
          <div className={styles.tabWidth}>
            <BurgerIngredients bread={data.bread} sauces={data.sauces}/>
          </div>
          <div className={styles.tabWidth}>
            <BurgerConstructor ingredientsDisplay={data.main} className={`mt-25 ml-10 ${styles.flexColumn}`}/>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
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
