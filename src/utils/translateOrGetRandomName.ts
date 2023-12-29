import translations from './orderTranslations';
import hashStringToIndex from './hashStringToIndex';

function translateOrGetRandomName(nameRu: string): string {
  const translation = translations[nameRu];
  if (translation && translation.en) {
    return translation.en;
  }

  const burgerNames = Object.values(translations).map((t) => t.en);
  const index = hashStringToIndex(nameRu, burgerNames.length);
  return burgerNames[index];
}

export default translateOrGetRandomName;
