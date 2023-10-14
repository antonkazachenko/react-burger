import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import withModalControl from '../../hocs/with-modal-control';
import IngredientsContext from '../../services/ingredientsContext';

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
  const { ingredients, bunData, isLoading } = useSelector((state: any) => state.ingredientsStore);
  const [_, setBunData] = React.useState([]);
  const [orderData, setOrderData] = React.useState([]);
  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, TotalInitialState, undefined);
  const dispatch = useDispatch();
  const data = ingredients;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
    setBunData(bunData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <IngredientsContext.Provider value={{ totalPriceDispatcher, totalPrice }}>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
