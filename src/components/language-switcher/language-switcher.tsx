import React from 'react';
import { useLanguage } from '../../utils/languageContext';
import styles from './language-switcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { switchLanguage, language } = useLanguage();

  return (
    <div className={styles.flex}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <button type="button" className={language === 'en' ? 'text text_type_main-default' : `text text_type_main-default ${styles.secondary}`} onClick={() => switchLanguage('en')}>
        EN
      </button>
      <div className={`text text_type_main-default ${styles.secondary} ${styles.marginX}`}>
        |
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <button type="button" className={language === 'ru' ? 'text text_type_main-default' : `text text_type_main-default ${styles.secondary}`} onClick={() => switchLanguage('ru')}>
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
