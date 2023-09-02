import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './App.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import apiLink from "../../utils/api";
import Modal from "../modal/modal";

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
    image: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
  } | null
};

function App() {
  const [data, setData] = React.useState<DataType>({
    bread: [],
    sauces: [],
    main: [],
    modalData: null
  })

  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setVisible] = React.useState(true);

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
        main: dataResp.data,
        modalData: null
      });
      setIsLoading(false);
    }

    getProductData()
      .catch((e) => console.log(e));
  }, [])

  const handleModal = (item?: any) => {
    if (item) {
      setVisible(!isVisible);
      data.modalData = item;
    } else {
      setVisible(!isVisible);
      data.modalData = null;
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
              <BurgerConstructor ingredientsDisplay={data.main} className={`mt-25 ml-10 ${styles.flexColumn}`}/>
            </div>
          </main>
        </div>
        <div className={styles.modal}>
          {isVisible && data.modalData && <Modal name={data.modalData.name} onClose={handleModal} children={data.modalData} /> }
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