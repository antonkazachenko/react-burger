import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredients from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

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
  modalData: {
    name: string,
    image_mobile: string,
    image_large: string,
    image: string,
    proteins: number,
    price: number,
    fat: number,
    carbohydrates: number,
    calories: number,
  } | null | undefined
};

function App() {
  const [data, setData] = React.useState<DataType>({
    bread: [],
    sauces: [],
    main: [],
    modalData: null
  })

  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setVisible] = React.useState(false);
  const [isCheckout, setCheckout] = React.useState(false);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleModal = (item?: any) => {
    if (item.data) {
      setVisible(!isVisible);
      data.modalData = item.data;
      setCheckout(false);
    } else if (item.isCheckout) {
      setVisible(!isVisible);
      setCheckout(true);
      console.log(isVisible);
    } else {
      setVisible(!isVisible);
      data.modalData = null;
      setCheckout(false);
    }
  }

  if (!isLoading) {
    return (
      <>
        <div className={styles.app}>
          <AppHeader/>
          <main>
            <div className={styles.tabWidth}>
              <BurgerIngredients modalClick={handleModal} bread={data.bread} sauces={data.sauces}/>
            </div>
            <div className={styles.tabWidth}>
              <BurgerConstructor modalClick={handleModal} ingredientsDisplay={data.main} className={`mt-25 ml-10 ${styles.flexColumn}`}/>
            </div>
          </main>
        </div>
        <div className={styles.modal}>
          {isVisible &&
            <Modal onClose={handleModal} >
              {!isCheckout ? <IngredientDetails data={data.modalData} onClose={handleModal}/> :
                <OrderDetails onClose={handleModal}/>}
            </Modal> }
        </div>
      </>
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