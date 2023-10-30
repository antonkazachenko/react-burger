import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import styles from './main-page.module.css';
import withModalControl from '../../hocs/with-modal-control';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import AppHeader from '../../components/app-header/app-header';

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

function MainPage() {
  return (
    <>
      <AppHeader />
      { /* eslint-disable-next-line react/jsx-no-constructed-context-values */ }
      <div className={styles.app}>
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
    </>
  );
}

export default MainPage;
