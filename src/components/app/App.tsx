import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredients from "../../utils/api";
import withModalControl from "../../hocs/with-modal-control";
import { IngredientsContext } from "../../services/ingredientsContext";

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setData(res.data.filter((item: any) => (item.type === "bun" || item.type === "sauce")));
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
      <IngredientsContext.Provider value={data}>
        <main>
          <div className={styles.tabWidth}>
            <BurgerIngredientsWithModal />
          </div>
          <div className={styles.tabWidth}>
            <BurgerConstructorWithModal
              className={`mt-25 ml-10 ${styles.flexColumn}`}
            />
          </div>
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}


export default App;