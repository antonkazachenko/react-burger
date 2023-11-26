import React from 'react';
import styles from './feed-data.module.css';

const FeedData = () => (
  <div>
    <div className={`${styles.flex} mb-15`}>
      <div className={`mr-9 ${styles.statusWidth}`}>
        <p className="text text_type_main-medium mb-6">Готовы:</p>
        <div>
          <p className={`text text_type_digits-default mb-2 ${styles.readyColor}`}>034533</p>
          <p className={`text text_type_digits-default mb-2 ${styles.readyColor}`}>034533</p>
          <p className={`text text_type_digits-default mb-2 ${styles.readyColor}`}>034533</p>
          <p className={`text text_type_digits-default mb-2 ${styles.readyColor}`}>034533</p>
          <p className={`text text_type_digits-default ${styles.readyColor}`}>034533</p>
        </div>
      </div>
      <div className={styles.statusWidth}>
        <p className="text text_type_main-medium mb-6">В работе:</p>
        <div>
          <p className="text text_type_digits-default mb-2">034538</p>
          <p className="text text_type_digits-default mb-2">034541</p>
          <p className="text text_type_digits-default mb-2">034542</p>
        </div>
      </div>
    </div>
    <div className="mb-15">
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`text text_type_digits-large ${styles.btnGlow}`}>28 752</p>
    </div>
    <div>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`text text_type_digits-large ${styles.btnGlow}`}>138</p>
    </div>
  </div>
);

export default FeedData;
