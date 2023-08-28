import data from "./data";
import styles from "../components/app/App.module.css";

const sauces = [{
  class: "ml-4",
  counterCheck: false,
  item: data[3],
  price: 30
},
  {
    class: "ml-6",
    counterCheck: false,
    item: data[6],
    price: 30
  },
  {
    class: `ml-4 mt-8 ${styles.relative}`,
    counterCheck: true,
    item: data[5],
    price: 30
  },
  {
    class: "ml-6 mt-8",
    counterCheck: false,
    item: data[9],
    price: 30
  }]

export default sauces;