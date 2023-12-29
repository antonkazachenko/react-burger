export type Language = 'en' | 'ru';

interface Translation {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translation = {
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
};

export default translations;
