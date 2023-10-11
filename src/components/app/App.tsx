import React, { useEffect, useReducer } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import withModalControl from '../../hocs/with-modal-control';
import IngredientsContext from '../../services/ingredientsContext';
import OrderContext from '../../services/orderContext';

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

const TotalInitialState = { price: 0 };
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      return { price: action.payload };
    case 'reset':
      return TotalInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [data, setData] = React.useState([]);
  const [bunData, setBunData] = React.useState<any>();
  const [orderData, setOrderData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, TotalInitialState, undefined);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setData(res.data.filter((item: any) => (item.type === 'bun' || item.type === 'sauce')));
        setBunData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <IngredientsContext.Provider value={{ data, totalPriceDispatcher, totalPrice }}>
        {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
        <OrderContext.Provider value={{
          bunData, orderData, setBunData, setOrderData,
        }}
        >
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
        </OrderContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
