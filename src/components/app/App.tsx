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

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

function App() {
  const { isLoading } = useSelector((state: any) => state.ingredientsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
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
    </div>
  );
}

export default App;
