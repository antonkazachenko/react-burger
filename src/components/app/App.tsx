import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredients from "../../utils/api";

type DataType = {
  bread: any[];
  sauces: any[];
  main: any[];
};

function App() {
  const [data, setData] = React.useState<DataType>({
    bread: [],
    sauces: [],
    main: [],
  });

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setData({
          bread: [res.data[0], res.data[7]],
          sauces: [res.data[3], res.data[4], res.data[8], res.data[9]],
          main: res.data,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <div className={styles.tabWidth}>
          <BurgerIngredients bread={data.bread} sauces={data.sauces} />
        </div>
        <div className={styles.tabWidth}>
          <BurgerConstructor
            ingredientsDisplay={data.main}
            className={`mt-25 ml-10 ${styles.flexColumn}`}
          />
        </div>
      </main>
    </div>
  );
}


export default App;