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
    en: 'Meat of Immortal Molluscs',
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
    en: 'Martian Alpha-Saccharides Crystals',
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
  'Альфа-сахаридный флюоресцентный space бургер text': {
    en: 'Exceptional Martian Alpha-Saccharides Crystals, '
      + 'a revolutionary ingredient for premium space burgers, are '
      + 'gaining universal popularity. These crystals, sourced from the '
      + 'depths of Martian terrain, add an otherworldly sweetness and '
      + 'texture that elevate the culinary experience to new cosmic heights.',
    ru: 'Исключительные кристаллы марсианских альфа-сахаридов, революционный '
      + 'ингредиент для премиальных космических бургеров, набирают популярность во всей вселенной. '
      + 'Эти кристаллы, добываемые из глубин марсианской поверхности, добавляют неземную сладость и '
      + 'текстуру, поднимая кулинарный опыт на новые космические высоты.',
  },
  'Антарианский флюоресцентный space бургер': {
    en: 'Antarian Fluorescent Space Burger',
    ru: 'Антарианский флюоресцентный space бургер',
  },
  'Антарианский флюоресцентный space бургер text': {
    en: 'The Antarian Fluorescent Space Burger is a cosmic delight, rapidly gaining fame across the galaxy. '
      + 'Infused with the luminescent essence of Antarian ingredients, this burger not only tantalizes the taste '
      + 'buds but also offers a visual feast with its radiant glow. A favorite among space travelers and gourmet '
      + 'aficionados, it\'s a true culinary masterpiece from another world.',
    ru: 'Антарианский флюоресцентный space бургер - это космическое удовольствие, быстро набирающее славу по всей галактике.'
      + ' Пропитанный светящейся сущностью антарианских ингредиентов, этот бургер не только ласкает вкусовые рецепторы, '
      + 'но и предлагает визуальное наслаждение своим сияющим светом. Являясь любимым блюдом космических путешественников и '
      + 'гурманов, он представляет собой настоящий кулинарный шедевр из другого мира.',
  },
  'Люминесцентный метеоритный бургер': {
    en: 'Luminescent Meteorite Burger',
    ru: 'Люминесцентный метеоритный бургер',
  },
  'Астероидный space бургер': {
    en: 'Asteroid Space Burger',
    ru: 'Астероидный space бургер',
  },
  'Астероидный space бургер text': {
    en: 'The Asteroid Space Burger is an out-of-this-world culinary experience, capturing the essence of the '
      + 'cosmos in every bite. Inspired by the rugged, mysterious nature of asteroids, this burger is known for '
      + 'its rich, robust flavors and unique texture. Its ingredients, sourced from asteroid-like environments, '
      + 'bring a sense of cosmic adventure to the dining table. The Asteroid Space Burger is not just a meal, but'
      + ' a journey through the stars, offering a taste of the universe in a truly innovative way.',
    ru: 'Астероидный space бургер - это космический кулинарный опыт, улавливающий суть космоса в каждом укусе. '
      + 'Вдохновленный суровой, таинственной природой астероидов, этот бургер известен своими богатыми, насыщенными'
      + ' вкусами и уникальной текстурой. Его ингредиенты, добываемые в условиях, напоминающих астероиды, приносят '
      + 'ощущение космического приключения на обеденный стол. Астероидный space бургер - это не просто еда, '
      + 'это путешествие по звездам, предлагающее попробовать вкус вселенной по-настоящему новаторским способом.',
  },
  'Традиционный-галактический флюоресцентный space бургер': {
    en: 'Traditional Galactic Fluorescent Space Burger',
    ru: 'Традиционный-галактический флюоресцентный space бургер',
  },
  'Традиционный-галактический флюоресцентный space бургер text': {
    en: 'The Traditional Galactic Fluorescent Space Burger blends age-old culinary traditions with the mystique '
      + 'of the cosmos. It\'s a classic burger reinvented with a space-age twist, featuring a fluorescent glow that'
      + ' adds an extraordinary visual appeal. This burger combines familiar, comforting flavors with a hint of galactic'
      + ' wonder, making it a hit among both traditionalists and futuristic foodies. It\'s where tradition meets '
      + 'innovation in a dazzling interstellar culinary creation.',
    ru: 'Традиционный-галактический флюоресцентный space бургер сочетает в себе вековые кулинарные традиции'
      + ' и таинственность космоса. Это классический бургер, переосмысленный в космическом стиле, с флюоресцентным'
      + ' свечением, добавляющим необыкновенную визуальную привлекательность. Этот бургер сочетает в себе знакомые,'
      + ' утешительные вкусы с намеком на галактическое чудо, делая его популярным как среди консерваторов,'
      + ' так и среди поклонников футуристической еды. Здесь традиция встречается с инновациями в захватывающем'
      + ' межзвездном кулинарном творении.',
  },
  'Флюоресцентный space бургер': {
    en: 'Fluorescent Space Burger',
    ru: 'Флюоресцентный space бургер',
  },
  'Флюоресцентный space бургер text': {
    en: 'The Fluorescent Space Burger is a cosmic culinary creation that glows with an otherworldly charm. This burger,'
      + ' illuminated with a fluorescent hue, offers a unique visual and taste experience. Infused with ingredients that '
      + 'radiate light, it\'s a favorite among adventurous diners seeking a meal that\'s as visually stunning as it is '
      + 'delicious. The Fluorescent Space Burger is more than just food; it\'s an interstellar spectacle on a plate.',
    ru: 'Флюоресцентный space бургер - это космическое кулинарное творение, сияющее неземным очарованием.'
      + ' Этот бургер, озаренный флюоресцентным оттенком, предлагает уникальный визуальный и вкусовой опыт. '
      + 'Пропитанный ингредиентами, излучающими свет, он является фаворитом среди авантюрных гурманов, ищущих '
      + 'блюдо, которое так же визуально поразительно, как и вкусно. Флюоресцентный space бургер - это не просто'
      + ' еда; это межзвездное зрелище на тарелке.',
  },
  'Краторный space бургер': {
    en: 'Crater Space Burger',
    ru: 'Краторный space бургер',
  },
  'Краторный space бургер text': {
    en: 'The Crater Space Burger is an intergalactic sensation, renowned for its bold flavors and extraterrestrial '
      + 'origins. Crafted from ingredients harvested from lunar craters, this burger offers a taste that\'s truly out '
      + 'of this world. Its unique texture and rich, savory profile make it a must-try for culinary explorers and space '
      + 'food enthusiasts alike. The Crater Space Burger is not just a meal, it\'s an experience that takes your taste '
      + 'buds on a journey through the cosmos.',
    ru: 'Краторный space бургер - это межгалактическое сенсационное блюдо, известное своими смелыми вкусами и '
      + 'внеземным происхождением. Сделанный из ингредиентов, собранных в лунных кратерах, этот бургер предлагает '
      + 'вкус, действительно не с этого мира. Его уникальная текстура и богатый, ароматный профиль делают его '
      + 'обязательным к пробованию для кулинарных исследователей и любителей космической еды. Краторный space '
      + 'бургер - это не просто еда, это опыт, который уносит ваши вкусовые рецепторы в путешествие по космосу.',
  },
  'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер': {
    en: 'Space Asteroid Alpha-Saccharide Immortal Fluorescent Burger',
    ru: 'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер',
  },
  'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер text': {
    en: 'The Space Asteroid Alpha-Saccharide Immortal Fluorescent Burger is a gastronomic marvel of the cosmos.'
      + ' This extraordinary burger blends the mystical qualities of asteroid-derived alpha-saccharides with a timeless,'
      + ' fluorescent charm. Its unique composition guarantees an unforgettable taste experience, captivating food lovers'
      + ' who crave interstellar adventures. The luminous and enduring flavors make it a sought-after delicacy'
      + ' among star-bound epicureans.',
    ru: 'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер - это кулинарное чудо космоса. '
      + 'Этот выдающийся бургер сочетает в себе мистические качества альфа-сахаридов, полученных из астероидов, с'
      + ' вечным флюоресцентным очарованием. Его уникальный состав гарантирует незабываемый вкусовой опыт,'
      + ' пленяющий любителей еды, жаждущих межзвездных приключений. Сияющие и долговечные вкусы делают его '
      + 'вожделенной деликатесностью среди эпикурейцев, стремящихся к звездам.',
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
  orderNumber: {
    en: 'order number',
    ru: 'идентификатор заказа',
  },
  orderStarted: {
    en: 'Your order has started being prepared',
    ru: 'Ваш заказ начали готовить',
  },
  waitForReady: {
    en: 'Wait for your order to be ready at the orbital station',
    ru: 'Дождитесь готовности на орбитальной станции',
  },
  moveTheBun: {
    en: 'Move the bun to the right side of the screen',
    ru: 'Перенесите булку в правую часть экрана',
  },
  addIngredientMobile: {
    en: 'Add ingredient',
    ru: 'Добавить',
  },
  seeOrder: {
    en: 'View order',
    ru: 'Посмотреть заказ',
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
