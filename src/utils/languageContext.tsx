// src/contexts/LanguageContext.tsx

import React, {
  useState, createContext, useContext, ReactNode, useMemo, useCallback,
} from 'react';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  hello: {
    en: 'Hello',
    ru: 'Привет',
  },
  headerConstructor: {
    en: 'Constructor',
    ru: 'Конструктор',
  },
  headerFeed: {
    en: 'Order feed',
    ru: 'Лента заказов',
  },
  headerProfile: {
    en: 'Profile',
    ru: 'Личный кабинет',
  },
  assembleBurger: {
    en: 'Create your burger',
    ru: 'Соберите бургер',
  },
  buns: {
    en: 'Buns',
    ru: 'Булки',
  },
  sauces: {
    en: 'Sauces',
    ru: 'Соусы',
  },
  fillings: {
    en: 'Fillings',
    ru: 'Начинки',
  },
  tabBuns: {
    en: 'Buns',
    ru: 'Булки',
  },
  tabSauces: {
    en: 'Sauces',
    ru: 'Соусы',
  },
  tabFillings: {
    en: 'Fillings',
    ru: 'Начинки',
  },
  'Краторная булка N-200i': {
    en: 'Crater Bun N-200i',
    ru: 'Краторная булка N-200i',
  },
  'Флюоресцентная булка R2-D3': {
    en: 'Fluorescent Bun R2-D3',
    ru: 'Флюоресцентная булка R2-D3',
  },
  'Соус Spicy-X': {
    en: 'Spicy-X Sauce',
    ru: 'Соус Spicy-X',
  },
  'Соус фирменный Space Sauce': {
    en: 'Signature Space Sauce',
    ru: 'Соус фирменный Space Sauce',
  },
  'Соус традиционный галактический': {
    en: 'Traditional Galactic Sauce',
    ru: 'Соус традиционный галактический',
  },
  'Соус с шипами Антарианского плоскоходца': {
    en: 'Sauce with Spikes of Antarian Flatfish',
    ru: 'Соус с шипами Антарианского плоскоходца',
  },
  'Биокотлета из марсианской Магнолии': {
    en: 'Bio-patty from Martian Magnolia',
    ru: 'Биокотлета из марсианской Магнолии',
  },
  'Филе Люминесцентного тетраодонтимформа': {
    en: 'Filet of Luminescent Tetraodontimform',
    ru: 'Филе Люминесцентного тетраодонтимформа',
  },
  'Мясо бессмертных моллюсков Protostomia': {
    en: 'Meat of Immortal Protostomia Molluscs',
    ru: 'Мясо бессмертных моллюсков Protostomia',
  },
  'Говяжий метеорит (отбивная)': {
    en: 'Beef Meteorite (steak)',
    ru: 'Говяжий метеорит (отбивная)',
  },
  'Хрустящие минеральные кольца': {
    en: 'Crunchy Mineral Rings',
    ru: 'Хрустящие минеральные кольца',
  },
  'Плоды Фалленианского дерева': {
    en: 'Fruits of the Fallen Tree',
    ru: 'Плоды Фалленианского дерева',
  },
  'Кристаллы марсианских альфа-сахаридов': {
    en: 'Crystals of Martian Alpha-Saccharides',
    ru: 'Кристаллы марсианских альфа-сахаридов',
  },
  'Мини-салат Экзо-Плантаго': {
    en: 'Mini Exo-Plantago Salad',
    ru: 'Мини-салат Экзо-Плантаго',
  },
  'Сыр с астероидной плесенью': {
    en: 'Cheese with Asteroid Mold',
    ru: 'Сыр с астероидной плесенью',
  },
  calories: {
    en: 'Calories, kcal',
    ru: 'Калории,ккал',
  },
  proteins: {
    en: 'Proteins, g',
    ru: 'Белки, г',
  },
  fat: {
    en: 'Fats, g',
    ru: 'Жиры, г',
  },
  carbohydrates: {
    en: 'Carbohydrates, g',
    ru: 'Углеводы, г',
  },
  ingredientDetails: {
    en: 'Ingredient Details',
    ru: 'Детали ингредиента',
  },
  createOrder: {
    en: 'Create order',
    ru: 'Оформить заказ',
  },
  readyOrders: {
    en: 'Ready',
    ru: 'Готовы',
  },
  inProgressOrders: {
    en: 'In progress',
    ru: 'В работе',
  },
  allTimeCompleted: {
    en: 'Completed over all time:',
    ru: 'Выполнено за все время:',
  },
  completedToday: {
    en: 'Completed today:',
    ru: 'Выполнено за сегодня:',
  },
  'Традиционный-галактический бургер': {
    en: 'Traditional Galactic Burger',
    ru: 'Традиционный-галактический бургер',
  },
  'Био-марсианский люминесцентный флюоресцентный бургер': {
    en: 'Bio-Martian Luminescent Fluorescent Burger',
    ru: 'Био-марсианский люминесцентный флюоресцентный бургер',
  },
  'Био-марсианский флюоресцентный бургер': {
    en: 'Bio-Martian Fluorescent Burger',
    ru: 'Био-марсианский флюоресцентный бургер',
  },
  'Экзо-плантаго spicy альфа-сахаридный минеральный бессмертный люминесцентный флюоресцентный бургер': {
    en: 'Exo-Plantago Spicy Alpha-Saccharide Mineral Immortal Luminescent Fluorescent Burger',
    ru: 'Экзо-плантаго spicy альфа-сахаридный минеральный бессмертный люминесцентный флюоресцентный бургер',
  },
  'Антарианский space флюоресцентный метеоритный бургер': {
    en: 'Antarian Space Fluorescent Meteorite Burger',
    ru: 'Антарианский space флюоресцентный метеоритный бургер',
  },
  'Spicy флюоресцентный метеоритный бургер': {
    en: 'Spicy Fluorescent Meteorite Burger',
    ru: 'Spicy флюоресцентный метеоритный бургер',
  },
  'Био-марсианский краторный space бургер': {
    en: 'Bio-Martian Crater Space Burger',
    ru: 'Био-марсианский краторный space бургер',
  },
  'Экзо-плантаго space астероидный spicy флюоресцентный бургер': {
    en: 'Exo-Plantago Space Asteroid Spicy Fluorescent Burger',
    ru: 'Экзо-плантаго space астероидный spicy флюоресцентный бургер',
  },
  'Минеральный люминесцентный краторный space бургер': {
    en: 'Mineral Luminescent Crater Space Burger',
    ru: 'Минеральный люминесцентный краторный space бургер',
  },
  'Антарианский краторный space бургер': {
    en: 'Antarian Crater Space Burger',
    ru: 'Антарианский краторный space бургер',
  },
  'Краторный бургер': {
    en: 'Crater Burger',
    ru: 'Краторный бургер',
  },
  'Альфа-сахаридный флюоресцентный space бургер': {
    en: 'Alpha-Saccharide Fluorescent Space Burger',
    ru: 'Альфа-сахаридный флюоресцентный space бургер',
  },
  'Антарианский флюоресцентный space бургер': {
    en: 'Antarian Fluorescent Space Burger',
    ru: 'Антарианский флюоресцентный space бургер',
  },
  'Люминесцентный метеоритный бургер': {
    en: 'Luminescent Meteorite Burger',
    ru: 'Люминесцентный метеоритный бургер',
  },
  'Астероидный space бургер': {
    en: 'Asteroid Space Burger',
    ru: 'Астероидный space бургер',
  },
  'Традиционный-галактический флюоресцентный space бургер': {
    en: 'Traditional Galactic Fluorescent Space Burger',
    ru: 'Традиционный-галактический флюоресцентный space бургер',
  },
  'Флюоресцентный space бургер': {
    en: 'Fluorescent Space Burger',
    ru: 'Флюоресцентный space бургер',
  },
  'Краторный space бургер': {
    en: 'Crater Space Burger',
    ru: 'Краторный space бургер',
  },
  'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер': {
    en: 'Space Asteroid Alpha-Saccharide Immortal Fluorescent Burger',
    ru: 'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер',
  },
  done: {
    en: 'Done',
    ru: 'Выполнен',
  },
  pending: {
    en: 'In progress',
    ru: 'Готовится',
  },
  created: {
    en: 'Created',
    ru: 'Создан',
  },
  ingredients: {
    en: 'Ingredients:',
    ru: 'Состав:',
  },
  today: {
    en: 'Today',
    ru: 'Сегодня',
  },
  login: {
    en: 'Login',
    ru: 'Войти',
  },
  loginTitle: {
    en: 'Login',
    ru: 'Вход',
  },
  name: {
    en: 'Name',
    ru: 'Имя',
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
  },
  newUserQuestion: {
    en: 'New to Space Burger?',
    ru: 'Вы — новый пользователь?',
  },
  forgotPasswordQuestion: {
    en: 'Forgot password?',
    ru: 'Забыли пароль?',
  },
  registerLink: {
    en: 'Register',
    ru: 'Зарегистрироваться',
  },
  resetPasswordLink: {
    en: 'Reset password',
    ru: 'Восстановите пароль',
  },
  registerTitle: {
    en: 'Registration',
    ru: 'Регистрация',
  },
  registerLinkQuestion: {
    en: 'Already have an account?',
    ru: 'Уже зарегистрированы?',
  },
  resetPasswordTitle: {
    en: 'Reset password',
    ru: 'Восстановление пароля',
  },
  enterEmail: {
    en: 'Enter your e-mail',
    ru: 'Укажите e-mail',
  },
  recover: {
    en: 'Recover',
    ru: 'Восстановить',
  },
  rememberedPassword: {
    en: 'Remembered your password?',
    ru: 'Вспомнили пароль?',
  },
  enterPassword: {
    en: 'Enter new password',
    ru: 'Введите новый пароль',
  },
  enterCode: {
    en: 'Enter code from email',
    ru: 'Введите код из письма',
  },
  logout: {
    en: 'Logout',
    ru: 'Выйти',
  },
  profile: {
    en: 'Profile',
    ru: 'Профиль',
  },
  orderHistory: {
    en: 'Order history',
    ru: 'История заказов',
  },
  profilePS1: {
    en: 'In this section you can',
    ru: 'В этом разделе вы можете',
  },
  profilePS2: {
    en: 'change your personal information',
    ru: 'изменить свои персональные данные',
  },
};

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const getDefaultLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ru' ? 'ru' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getDefaultLanguage());

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []); // Empty dependencies array, as this function does not depend on any external values

  const t = useCallback((key: string): string => translations[key][language]
    || key, [language]); // Dependency array with 'language'

  const value = useMemo(() => ({ language, switchLanguage, t }), [language, switchLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
