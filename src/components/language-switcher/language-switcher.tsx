import React from 'react';
import { useLanguage } from '../../utils/languageContext';

const LanguageSwitcher: React.FC = () => {
  const { switchLanguage } = useLanguage();

  return (
    <div>
      <button type="button" onClick={() => switchLanguage('en')}>English</button>
      <button type="button" onClick={() => switchLanguage('ru')}>Русский</button>
    </div>
  );
};

export default LanguageSwitcher;
