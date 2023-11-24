import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { FC } from 'react';
import styles from './main-page.module.css';
import withModalControl from '../../hocs/with-modal-control';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

const MainPage: FC<object> = () => (
  <>
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

export default MainPage;
