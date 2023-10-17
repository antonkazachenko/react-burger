import styles from '../components/app/App.module.css';
import data from './data';

const bread = [{
  class: `ml-4 ${styles.relative}`,
  counterCheck: true,
  item: data[0],
  price: 20,
},
{
  class: 'ml-6',
  counterCheck: false,
  item: data[data.length - 1],
  price: 20,
}];

export default bread;
